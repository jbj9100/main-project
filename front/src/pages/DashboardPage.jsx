import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard'; // Import the new component
import './DashboardPage.css';

// 백엔드 API URL
const API_BASE_URL = 'http://localhost:8000';

const DashboardPage = () => {
    const navigate = useNavigate();

    // --- State Management ---
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // all, active, archived
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newProject, setNewProject] = useState({ name: '', description: '' });
    const [editingProject, setEditingProject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch Projects from Backend API
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/projects`, {
                withCredentials: true  // 세션 쿠키 포함
            });
            setProjects(response.data);
        } catch (err) {
            console.error('Failed to fetch projects:', err);
            setError('프로젝트 목록을 불러오는데 실패했습니다.');
            // 에러 시 빈 배열로 초기화
            setProjects([]);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Actions ---
    const handleCreateProject = async () => {
        if (!newProject.name) {
            alert('Project Name is required!');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/projects`,
                {
                    name: newProject.name,
                    description: newProject.description || ''
                },
                {
                    withCredentials: true  // 세션 쿠키 포함
                }
            );

            // 새로 생성된 프로젝트를 목록 맨 앞에 추가
            setProjects([response.data, ...projects]);
            setIsModalOpen(false);
            setNewProject({ name: '', description: '' });
        } catch (err) {
            console.error('Failed to create project:', err);
            alert('프로젝트 생성에 실패했습니다: ' + (err.response?.data?.detail || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) {
            return;
        }

        setIsLoading(true);
        try {
            await axios.delete(`${API_BASE_URL}/api/projects/${id}`, {
                withCredentials: true  // 세션 쿠키 포함
            });

            // 삭제 성공 시 목록에서 제거
            setProjects(projects.filter(p => p.id !== id));
        } catch (err) {
            console.error('Failed to delete project:', err);
            alert('프로젝트 삭제에 실패했습니다: ' + (err.response?.data?.detail || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditProject = (project) => {
        setEditingProject(project);
        setIsEditModalOpen(true);
    };

    const handleUpdateProject = async () => {
        if (!editingProject.name) {
            alert('Project Name is required!');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.patch(
                `${API_BASE_URL}/api/projects/${editingProject.id}`,
                {
                    name: editingProject.name,
                    description: editingProject.description,
                    status: editingProject.status
                },
                {
                    withCredentials: true  // 세션 쿠키 포함
                }
            );

            // 수정된 프로젝트를 목록에서 업데이트
            setProjects(projects.map(p => p.id === editingProject.id ? response.data : p));
            setIsEditModalOpen(false);
            setEditingProject(null);
        } catch (err) {
            console.error('Failed to update project:', err);
            alert('프로젝트 수정에 실패했습니다: ' + (err.response?.data?.detail || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    // --- Filtering Logic ---
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // --- Stats Calculation ---
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const totalMembers = projects.reduce((acc, curr) => acc + curr.members, 0);


    return (
        <div className="dashboard-container">
            {/* 1. Header Section */}
            <div className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">Project Management</h1>
                    <p className="dashboard-desc">Manage and monitor all your projects in one place.</p>
                </div>
                <div className="user-profile-summary">
                    {/* Placeholder for user profile if needed */}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div style={{
                    backgroundColor: '#fee',
                    color: '#c33',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    border: '1px solid #fcc'
                }}>
                    ⚠️ {error}
                </div>
            )}

            {/* 2. Overview Stats */}
            <div className="stats-container">
                <div className="stat-card">
                    <div className="stat-label">Total Projects</div>
                    <div className="stat-number">{totalProjects}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Active Projects</div>
                    <div className="stat-number text-green">{activeProjects}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Total Members</div>
                    <div className="stat-number text-blue">{totalMembers}</div>
                </div>
            </div>

            {/* 3. Control Bar (Search, Filter, Add) */}
            <div className="control-bar">
                <div className="search-filter-group">
                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="status-filter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>
                <button
                    className="btn-primary"
                    onClick={() => setIsModalOpen(true)}
                    disabled={isLoading}
                >
                    + New Project
                </button>
            </div>

            {/* 4. Project Grid */}
            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#888' }}>
                    로딩 중...
                </div>
            ) : (
                <div className="project-grid">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map(project => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onEdit={handleEditProject}
                                onDelete={handleDeleteProject}
                            />
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No projects found matching your criteria.</p>
                        </div>
                    )}
                </div>
            )}

            {/* 5. Create Project Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Create New Project</h2>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Project Name <span className="required">*</span></label>
                                <input
                                    type="text"
                                    value={newProject.name}
                                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                    placeholder="Enter project name"
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                    placeholder="Enter project description"
                                    rows={3}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button
                                className="btn-save"
                                onClick={handleCreateProject}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating...' : 'Create Project'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 6. Edit Project Modal */}
            {isEditModalOpen && editingProject && (
                <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Edit Project</h2>
                            <button className="close-btn" onClick={() => setIsEditModalOpen(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Project Name <span className="required">*</span></label>
                                <input
                                    type="text"
                                    value={editingProject.name}
                                    onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                                    placeholder="Enter project name"
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={editingProject.description}
                                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                                    placeholder="Enter project description"
                                    rows={3}
                                />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    value={editingProject.status}
                                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                                >
                                    <option value="active">Active</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                            <button
                                className="btn-save"
                                onClick={handleUpdateProject}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Updating...' : 'Update Project'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;


