// Create DNA strands
function createDNAStrands() {
    const dnaContainer = document.querySelector('.dna-bg');
    const strandCount = 20; // Number of DNA strands
    
    for (let i = 0; i < strandCount; i++) {
        const strand = document.createElement('div');
        strand.classList.add('dna-strand');
        strand.style.left = `${Math.random() * 100}%`;
        strand.style.animationDuration = `${15 + Math.random() * 10}s`;
        strand.style.animationDelay = `${Math.random() * 5}s`;
        dnaContainer.appendChild(strand);
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        if (!targetId) return; // If href="#", do nothing
        
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Interactive button effect with ripple
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        createRipple(e);
        // Add button press animation
        ctaButton.style.transform = 'scale(0.98)';
        setTimeout(() => {
            ctaButton.style.transform = 'translateY(-3px)';
        }, 150);
    });
}

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
}

// Feature cards interactive effects
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for DNA strands
document.addEventListener('mousemove', (e) => {
    const dnaStrands = document.querySelectorAll('.dna-strand');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    dnaStrands.forEach((strand, index) => {
        const speed = (index + 1) * 0.2;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        strand.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add smooth reveal animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add extra animation for feature cards
            if (entry.target.classList.contains('feature-card')) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        }
    });
}, observerOptions);

function createDNAParticles() {
    const container = document.querySelector('.dna-bg');
    const dnaContainer = document.createElement('div');
    dnaContainer.className = 'dna-container';
    
    const numParticles = 30;
    const radius = 100;
    const height = 600;
    const spacing = height / numParticles;
    
    for (let i = 0; i < numParticles; i++) {
        const y = (i * spacing) - (height / 2);
        
        const angle1 = (i / numParticles) * Math.PI * 4;
        const x1 = Math.cos(angle1) * radius;
        const z1 = Math.sin(angle1) * radius;
        
        const particle1 = document.createElement('div');
        particle1.className = 'particle';
        particle1.style.transform = `translate3d(${x1}px, ${y}px, ${z1}px)`;
        
        const angle2 = angle1 + Math.PI;
        const x2 = Math.cos(angle2) * radius;
        const z2 = Math.sin(angle2) * radius;
        
        const particle2 = document.createElement('div');
        particle2.className = 'particle';
        particle2.style.transform = `translate3d(${x2}px, ${y}px, ${z2}px)`;
        
        if (i < numParticles - 1) {
            const connector = document.createElement('div');
            connector.className = 'connector';
            const dx = x2 - x1;
            const dz = z2 - z1;
            const length = Math.sqrt(dx * dx + dz * dz);
            const angle = Math.atan2(dz, dx);
            connector.style.width = `${length}px`;
            connector.style.transform = `translate3d(${x1}px, ${y}px, ${z1}px) rotateY(${angle}rad)`;
            connector.style.opacity = '0.3';
            dnaContainer.appendChild(connector);
        }
        
        [particle1, particle2].forEach(particle => {
            const size = 3 + Math.random() * 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = 0.6 + Math.random() * 0.4;
        });
        
        dnaContainer.appendChild(particle1);
        dnaContainer.appendChild(particle2);
    }
    
    container.appendChild(dnaContainer);
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    createDNAParticles();
    
    // Observe elements for scroll animations
    document.querySelectorAll('.hero > *, .feature-card, .section').forEach(element => {
        observer.observe(element);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const oldDNA = document.querySelector('.dna-container');
        if (oldDNA) {
            oldDNA.remove();
            createDNAParticles();
        }
    });
});

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('.section, #hero');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Bed Management System
class BedManagementSystem {
    constructor() {
        this.beds = [];
        this.activities = [];
        this.initializeBeds();
        this.setupEventListeners();
        this.renderBeds();
        this.renderActivities();
    }

    initializeBeds() {
        // Initialize with sample data
        for (let i = 1; i <= 50; i++) {
            this.beds.push({
                id: i,
                status: this.getRandomStatus(),
                patient: null,
                lastUpdated: new Date()
            });
        }
    }

    getRandomStatus() {
        const statuses = ['available', 'occupied', 'maintenance'];
        const weights = [0.3, 0.6, 0.1]; // 30% available, 60% occupied, 10% maintenance
        const random = Math.random();
        let sum = 0;
        for (let i = 0; i < weights.length; i++) {
            sum += weights[i];
            if (random <= sum) return statuses[i];
        }
        return statuses[0];
    }

    setupEventListeners() {
        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterBeds(btn.dataset.filter);
            });
        });
    }

    filterBeds(status) {
        const bedElements = document.querySelectorAll('.bed-item');
        bedElements.forEach(bed => {
            if (status === 'all' || bed.dataset.status === status) {
                bed.style.display = 'block';
            } else {
                bed.style.display = 'none';
            }
        });
    }

    renderBeds() {
        const bedGrid = document.getElementById('bedGrid');
        if (!bedGrid) return;

        bedGrid.innerHTML = '';
        this.beds.forEach(bed => {
            const bedElement = document.createElement('div');
            bedElement.className = `bed-item ${bed.status}`;
            bedElement.dataset.status = bed.status;
            bedElement.innerHTML = `
                <i class="fas fa-bed"></i>
                <span class="bed-number">Bed ${bed.id}</span>
                <span class="bed-status">${bed.status}</span>
            `;
            bedElement.addEventListener('click', () => this.handleBedClick(bed));
            bedGrid.appendChild(bedElement);
        });
    }

    handleBedClick(bed) {
        // Show bed details or update status
        const newStatus = this.getNextStatus(bed.status);
        bed.status = newStatus;
        this.addActivity(`Bed ${bed.id} status changed to ${newStatus}`);
        this.renderBeds();
        this.updateStats();
    }

    getNextStatus(currentStatus) {
        const statusOrder = ['available', 'occupied', 'maintenance'];
        const currentIndex = statusOrder.indexOf(currentStatus);
        return statusOrder[(currentIndex + 1) % statusOrder.length];
    }

    addActivity(description) {
        const activity = {
            id: this.activities.length + 1,
            description,
            timestamp: new Date()
        };
        this.activities.unshift(activity);
        this.renderActivities();
    }

    renderActivities() {
        const activityList = document.getElementById('activityList');
        if (!activityList) return;

        activityList.innerHTML = '';
        this.activities.slice(0, 5).forEach(activity => {
            const activityElement = document.createElement('div');
            activityElement.className = 'activity-item';
            activityElement.innerHTML = `
                <span class="activity-time">${this.formatTime(activity.timestamp)}</span>
                <span class="activity-description">${activity.description}</span>
            `;
            activityList.appendChild(activityElement);
        });
    }

    formatTime(date) {
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).format(date);
    }

    updateStats() {
        const stats = this.beds.reduce((acc, bed) => {
            acc[bed.status] = (acc[bed.status] || 0) + 1;
            return acc;
        }, {});

        document.querySelector('.available-beds .count').textContent = stats.available || 0;
        document.querySelector('.occupied-beds .count').textContent = stats.occupied || 0;
    }
}

// Initialize the system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const bedSystem = new BedManagementSystem();
    window.bedSystem = bedSystem; // Make it accessible globally for debugging
});
