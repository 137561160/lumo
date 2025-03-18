document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单激活状态
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if(menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // 产品标签切换
    const tabLinks = document.querySelectorAll('.tab-navigation li');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabLinks.forEach(l => l.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 数字统计动画
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const count = +stat.innerText;
            const speed = target / 100;
            
            if(count < target) {
                stat.innerText = Math.ceil(count + speed);
                setTimeout(animateStats, 20);
            } else {
                stat.innerText = target;
            }
        });
    }
    
    // 当页面滚动到About部分时开始动画
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsContainer = document.querySelector('.stats-container');
    if(statsContainer) {
        observer.observe(statsContainer);
    }

    // 客户评价轮播
    const testimonialDots = document.querySelectorAll('.nav-dot');
    const testimonials = document.querySelectorAll('.testimonial');
    
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            
            testimonialDots.forEach(d => d.classList.remove('active'));
            testimonials.forEach(t => t.classList.remove('active'));
            
            this.classList.add('active');
            testimonials[index].classList.add('active');
        });
    });

    // 自动切换客户评价
    let currentTestimonial = 0;
    const testimonialCount = testimonials.length;
    
    function nextTestimonial() {
        testimonials[currentTestimonial].classList.remove('active');
        testimonialDots[currentTestimonial].classList.remove('active');
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCount;
        
        testimonials[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }
    
    setInterval(nextTestimonial, 5000);

    // 表单提交
    const contactForm = document.getElementById('inquiryForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 在这里可以添加表单验证和提交逻辑
            alert('感谢您的咨询！我们将尽快回复。');
            this.reset();
        });
    }

    // 返回顶部按钮
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        // 计算页面总高度的五分之一
        const pageHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollThreshold = (pageHeight - viewportHeight) / 5;
        
        // 当滚动超过页面高度的五分之一时显示按钮
        if (window.pageYOffset > scrollThreshold) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // 点击返回顶部
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 图片懒加载
    if ('loading' in HTMLImageElement.prototype) {
        // 浏览器支持原生懒加载
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // 回退方案 - 加载懒加载脚本
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // 优化图片加载
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // 导航栏滚动效果
    const header = document.querySelector('#header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 优化滚动显示动画
    const scrollObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, scrollObserverOptions);

    document.querySelectorAll('.reveal').forEach(el => scrollObserver.observe(el));

    // 创建占位图片文件夹
    function createPlaceholderImages() {
        // 检查是否已经创建了images文件夹
        const checkImagesFolder = async () => {
            try {
                const response = await fetch('images/placeholder.jpg');
                return response.ok;
            } catch (e) {
                return false;
            }
        };
        
        // 如果没有找到图片，使用内联SVG作为占位图
        const createPlaceholder = (element, type) => {
            const colors = {
                'team': '#005B96',
                'product': '#FF6B35',
                'lab': '#4CAF50'
            };
            
            const color = colors[type] || '#cccccc';
            const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="${color}" opacity="0.2"/>
                    <text x="50%" y="50%" font-family="Arial" font-size="24" text-anchor="middle" fill="#555">
                        ${type.charAt(0).toUpperCase() + type.slice(1)} Image
                    </text>
                </svg>
            `;
            
            const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
            element.src = url;
            element.style.backgroundColor = '#f8f9fa';
        };
        
        // 应用到所有图片
        document.querySelectorAll('.team-member img').forEach(img => {
            createPlaceholder(img, 'team');
        });
        
        document.querySelectorAll('.product-card img').forEach(img => {
            createPlaceholder(img, 'product');
        });
        
        document.querySelectorAll('.custom-image img').forEach(img => {
            createPlaceholder(img, 'lab');
        });
    }

    // 调用函数
    createPlaceholderImages();

    // 创建动态favicon
    function createFavicon() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        
        const ctx = canvas.getContext('2d');
        
        // 绘制背景
        ctx.fillStyle = '#005B96';
        ctx.fillRect(0, 0, 32, 32);
        
        // 绘制字母
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('L', 16, 16);
        
        // 创建favicon链接
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = canvas.toDataURL('image/x-icon');
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    // 调用函数
    createFavicon();

    // 修改图片加载策略
    function optimizeImageLoading() {
        // 使用内联SVG作为占位图
        const placeholders = {
            'team': createSVGPlaceholder('#005B96', 'Team Member'),
            'product': createSVGPlaceholder('#FF6B35', 'Product'),
            'lab': createSVGPlaceholder('#4CAF50', 'Laboratory')
        };
    
        // 为所有图片添加加载效果
        document.querySelectorAll('img').forEach(img => {
            // 跳过已处理的图片
            if (img.classList.contains('processed')) return;
    
            // 添加加载类
            img.classList.add('image-loading', 'processed');
    
            // 根据图片容器类型选择占位图
            let type = 'product';
            if (img.closest('.team-member')) type = 'team';
            if (img.closest('.custom-image')) type = 'lab';
    
            // 设置占位图
            const originalSrc = img.src;
            img.src = placeholders[type];
    
            // 图片加载完成后移除加载类
            const newImg = new Image();
            newImg.onload = function() {
                setTimeout(() => {
                    img.src = originalSrc;
                    img.classList.remove('image-loading');
                }, 300); // 添加延迟以显示过渡效果
            };
            newImg.onerror = function() {
                console.error(`Failed to load image: ${originalSrc}`); // 将错误日志移到此处
                img.classList.remove('image-loading');
            };
    
            // 尝试加载原始图片
            if (originalSrc && !originalSrc.startsWith('data:')) {
                newImg.src = originalSrc;
            }
        });
    }

    // 创建SVG占位图
    function createSVGPlaceholder(color, text) {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                <rect width="400" height="300" fill="${color}" opacity="0.2"/>
                <text x="50%" y="50%" font-family="Arial" font-size="24" text-anchor="middle" fill="#555">
                    ${text}
                </text>
            </svg>
        `;
        
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    // 调用函数
    optimizeImageLoading();

    // 导航菜单增强
    function enhanceNavigation() {
        const navLinks = document.querySelectorAll('.main-nav a');
        const sections = document.querySelectorAll('section');
        
        // 点击导航链接时添加平滑滚动和活动状态
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 移除所有活动状态
                navLinks.forEach(l => l.classList.remove('active'));
                
                // 添加当前链接的活动状态
                this.classList.add('active');
                
                // 获取目标部分并滚动到那里
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // 平滑滚动到目标部分
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // 如果在移动设备上，关闭菜单
                    if (window.innerWidth <= 768) {
                        document.querySelector('.main-nav').classList.remove('active');
                        document.querySelector('.menu-toggle').classList.remove('active');
                    }
                }
            });
        });
        
        // 滚动时更新活动导航链接
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 200)) {
                    current = '#' + section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === current) {
                    link.classList.add('active');
                }
            });
        });
        
        // 移动菜单切换增强
        const menuToggle = document.querySelector('.menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                mainNav.classList.toggle('active');
                
                // 添加动画效果
                if (mainNav.classList.contains('active')) {
                    // 逐个显示菜单项
                    const menuItems = mainNav.querySelectorAll('li');
                    menuItems.forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(-20px)';
                        setTimeout(() => {
                            item.style.transition = 'all 0.3s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100 * index);
                    });
                }
            });
        }
    }

    // 调用函数
    enhanceNavigation();

    // 添加联系区域动画效果
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 联系信息项动画
                const infoItems = entry.target.querySelectorAll('.info-item');
                infoItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 100 * index);
                });
                
                // 联系行动区域动画
                const actionItems = entry.target.querySelectorAll('.direct-contact, .business-hours');
                actionItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 300 + 200 * index);
                });
                
                contactObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    // 观察联系区域
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        // 设置初始状态
        contactSection.querySelectorAll('.info-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s ease';
        });
        
        contactSection.querySelectorAll('.direct-contact, .business-hours').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.5s ease';
        });
        
        contactObserver.observe(contactSection);
    }
});

// 页面载入优化
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 顺序展示各部分
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
        }, 100 * index);
    });

    // 添加页面加载器
    const loader = document.createElement('div');
    loader.className = 'content-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.prepend(loader);

    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 500);
});

// 滚动动画
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(item => {
        const windowHeight = window.innerHeight;
        const elementTop = item.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// 初始启动滚动检测
revealOnScroll(); 