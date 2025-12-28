import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const handleGoToProject = (e) => {
        e.stopPropagation();
        // 실제 프로젝트 페이지로 이동 (예: /project/main_hub)
        navigate(`/project/${project.name}`);
    };

    return (
        <div className="project-card" onClick={handleGoToProject}>
            <div className="project-card-header">
                <div className="project-info">
                    <h3 className="project-name">{project.name}</h3>
                    <span className={`project-status status-${project.status}`}>
                        {project.status === 'active' ? 'Active' : 'Archived'}
                    </span>
                </div>
                <div className="project-actions">
                    <button
                        className="action-btn go-btn"
                        onClick={handleGoToProject}
                        title="Go to Project"
                    >
                        🚀
                    </button>
                    <button
                        className="action-btn edit-btn"
                        onClick={(e) => { e.stopPropagation(); onEdit(project); }}
                        title="Edit Project"
                    >
                        ✏️
                    </button>
                    <button
                        className="action-btn delete-btn"
                        onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
                        title="Delete Project"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            <div className="project-card-body">
                <p className="project-description">{project.description}</p>
            </div>

            <div className="project-card-footer">
                <div className="project-meta">
                    <span className="meta-icon">📅</span>
                    <span>Updated: {project.lastUpdated}</span>
                </div>
                <div className="project-meta">
                    <span className="meta-icon">👥</span>
                    <span>Members: {project.members}</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
