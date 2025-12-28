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
    const [newProject, setNewProject] = useState({ name: '', description: '' });

    // Mock Data Initialization (In real app, fetch from API)
    useEffect(() => {
        const mockProjects = [
            {
                id: 1,
                name: 'main_hub',
                description: 'The central hub for all project management activities. This project coordinates multiple sub-modules.',
                status: 'active',
                lastUpdated: '2024-12-28',
                members: 5
            },
            {
                id: 2,
                name: 'legacy_system_v1',
                description: 'Old legacy system maintenance. Currently in read-only mode for historical data access.',
                status: 'archived',
                lastUpdated: '2023-11-15',
                members: 2
            },
            {
                id: 3,
                name: 'api_gateway',
                description: 'Gateway service for routing requests to appropriate microservices.',
                status: 'active',
                lastUpdated: '2024-12-25',
                members: 8
            },
            {
                id: 4,
                name: 'auth_service',
                description: 'Authentication and authorization service using JWT and OAuth2.',
                status: 'active',
                lastUpdated: '2024-12-27',
                members: 4
            }
        ];

        // Simulating API fetch
        setProjects(mockProjects);
    }, []);

    // --- Actions ---
    const handleCreateProject = () => {
        if (!newProject.name) {
            alert('Project Name is required!');
            return;
        }

        const newId = projects.length + 1;
        const projectToAdd = {
            id: newId,
            name: newProject.name,
            description: newProject.description || 'No description provided.',
            status: 'active',
            lastUpdated: new Date().toISOString().split('T')[0],
            members: 1
        };

        setProjects([projectToAdd, ...projects]);
        setIsModalOpen(false);
        setNewProject({ name: '', description: '' });
    };

    const handleDeleteProject = (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const handleEditProject = (project) => {
        alert(`Edit feature for "${project.name}" coming soon!`);
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
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                    + New Project
                </button>
            </div>

            {/* 4. Project Grid */}
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
                            <button className="btn-save" onClick={handleCreateProject}>Create Project</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;

