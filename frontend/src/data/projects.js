export const projectsData = [
  {
    id: 1,
    slug: 'advanced-cicd-pipeline',
    title: 'Advanced CI/CD Pipeline',
    subtitle: 'Automated Deployment Workflow',
    description: 'Engineered a multi-stage continuous integration and deployment pipeline. Implemented branch-based workflows with preview environments and automated rollbacks, virtually eliminating manual deployment friction.',
    image: '/manga/project1.jpg',
    tags: ['GitHub Actions', 'Docker', 'CI/CD', 'Linux'],
    liveUrl: '#',
    githubUrl: '#',
    details: {
      overview: 'Modern software engineering demands zero-friction deployments. The goal of this project was to completely automate the journey of code from a local machine to a production environment. I engineered a robust CI/CD pipeline that eliminates human error and guarantees consistent, reliable releases.',
      architecture: 'The core architecture leverages GitHub Actions to intercept code pushes. Upon receiving a commit, the pipeline initiates a rigorous automated testing phase. If successful, Docker steps in to containerize the application, ensuring environmental parity. Finally, the container is pushed to a registry and deployed to the production server.',
      challenges: 'One of the primary challenges was implementing a seamless rollback mechanism in case of deployment failures. I engineered a state-checking script that verifies the health of the newly deployed container and automatically reverts to the previous stable image if it detects instability.',
      outcomes: 'Deployment times were reduced by 80%, and the team achieved a zero-downtime release cycle. The automated preview environments also drastically improved code review efficiency.'
    }
  },
  {
    id: 2,
    slug: 'krishinetra',
    title: 'KrishiNetra',
    subtitle: 'AI-Powered Crop Analysis',
    description: 'Built a real-time AI inference backend serving an Android application. Bridged MobileNetV2 with a scalable FastAPI architecture to deliver immediate crop disease diagnostics to users.',
    image: '/manga/project2.jpg',
    tags: ['TensorFlow', 'FastAPI', 'Python', 'Android'],
    liveUrl: '#',
    githubUrl: '#',
    details: {
      overview: 'Farmers often struggle to identify crop diseases early enough to prevent significant yield loss. KrishiNetra was conceived to bring advanced diagnostic tools directly to the field via a mobile device. It uses deep learning to identify diseases from a simple smartphone photo.',
      architecture: 'The system is divided into two main components: a lightweight Android application for capturing images, and a highly scalable FastAPI backend. The backend hosts a customized MobileNetV2 TensorFlow model, optimized for fast inference on cloud infrastructure.',
      challenges: 'Optimizing the AI model for speed without sacrificing accuracy was a major hurdle. The model needed to process high-resolution field photos rapidly. I utilized TensorFlow Lite for model quantization and implemented asynchronous request handling in FastAPI to manage concurrent user loads.',
      outcomes: 'The application achieved a 94% accuracy rate in detecting 14 different plant diseases. The API response time was optimized to under 200ms, providing a near-instantaneous experience for the end-user.'
    }
  },
  {
    id: 3,
    slug: 'infrastructure-as-code',
    title: 'Infrastructure as Code',
    subtitle: 'AWS Terraform Provisioning',
    description: 'Designed and deployed a highly available AWS cloud architecture. Authored modular, reusable Terraform configurations to manage VPCs, subnets, and database clusters, ensuring absolute consistency across deployments.',
    image: '/manga/project3.jpg',
    tags: ['AWS', 'Terraform', 'IaC', 'EC2'],
    liveUrl: '#',
    githubUrl: '#',
    details: {
      overview: 'Manual server configuration is a fragile and unscalable practice. To build a robust, enterprise-grade cloud environment, I transitioned all infrastructure management to code. This project outlines the creation of a highly available, secure AWS architecture using Terraform.',
      architecture: 'The infrastructure is defined declaratively. It provisions a custom Virtual Private Cloud (VPC) spanning multiple Availability Zones. It includes public subnets for load balancers and NAT gateways, and private subnets for EC2 application instances and RDS database clusters, strictly controlling access.',
      challenges: 'Managing Terraform state securely in a collaborative environment was critical. I implemented remote state locking using DynamoDB and S3 to prevent concurrent modifications and state corruption. Additionally, architecting the security groups for least-privilege access required meticulous planning.',
      outcomes: 'Infrastructure provisioning time was slashed from days to minutes. The modular nature of the Terraform code allows for instant replication of the environment for staging and testing purposes, guaranteeing environment parity.'
    }
  }
]
