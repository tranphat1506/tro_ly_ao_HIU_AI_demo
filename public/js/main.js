// Class quản lý danh sách chuyên ngành
class Majors {
    constructor() {
        this.list = ['Y khoa', 'Y học cổ truyền', 'Y tế công cộng', 'Răng Hàm Mặt', 'Dược học', 'Điều dưỡng', 'Hộ sinh', 'Dinh dưỡng', 'Kỹ thuật phục hồi chức năng', 'Kỹ thuật xét nghiệm y học', 'Kỹ thuật hình ảnh y học', 'Digital Marketing', 'Thương mại điện tử', 'Quản trị kinh doanh', 'Quản trị sự kiện', 'Quản trị khách sạn', 'Quản trị dịch vụ du lịch và lữ hành', 'Tài chính ngân hàng', 'Kế toán', 'Luật', 'Luật kinh tế', 'Công nghệ tài chính', 'Kinh doanh quốc tế', 'Ngôn ngữ Anh', 'Ngôn ngữ Nhật', 'Ngôn ngữ Trung Quốc', 'Ngôn ngữ Hàn Quốc', 'Truyền thông đa phương tiện', 'Quan hệ công chúng', 'Quan hệ quốc tế', 'Tâm lý học', 'Việt Nam học', 'Công nghệ thông tin', 'Logistics và quản lý chuỗi cung ứng', 'Thiết kế đồ họa', 'Kiến trúc', 'Kỹ thuật Y sinh', 'Kỹ thuật cơ điện tử', 'Công nghệ sinh học', 'Quản lý giáo dục', 'Giáo dục tiểu học', 'Giáo dục mầm non'];
    }

    shuffle() {
        return [...this.list].sort(() => 0.5 - Math.random());
    }
}

// Class quản lý slogan
class SloganGenerator {
    constructor() {
        this.templates = [`Bạn có đam mê với {major}, hỏi trợ lý ảo <strong class="hiu">HIU</strong> <strong class="ai">AI</strong> ngay.`, `Tìm hiểu về ngành {major} với trợ lý ảo <strong class="hiu">HIU</strong> <strong class="ai">AI</strong>.`, `Bạn có muốn biết học phí một năm {major} tại <strong class="hiu">HIU</strong> không?`, `Khám phá tương lai cùng ngành {major} tại <strong class="hiu">HIU</strong>.`, `Ngành {major} – Bệ phóng cho sự nghiệp của bạn.`, `Học ngành {major} tại <strong class="hiu">HIU</strong> để dẫn đầu xu hướng.`, `Đam mê {major}? <strong class="hiu">HIU</strong> <strong class="ai">AI</strong> sẽ giúp bạn chinh phục.`, `Cùng <strong class="hiu">HIU</strong> khám phá tiềm năng của ngành {major}.`];
        this.fixed = [`Tìm ngành phù hợp, chinh phục ước mơ.`, `Chọn <strong class="hiu" style="font-family: inherit; font-weight: 800">Hồng Bàng</strong> - Vững vàng tương lai.`, `Định hướng hôm nay, thành công mai sau.`];
    }

    generateRandomSlogans(majorsInstance) {
        const slogans = [];
        const totalSlogans = majorsInstance.list.length; // Lấy độ dài trực tiếp từ list
        const minFixedCount = Math.ceil(totalSlogans * 0.3); // Tối thiểu 30% fixed slogans

        // Thêm slogan cố định
        for (let i = 0; i < minFixedCount; i++) {
            const randomFixedIndex = Math.floor(Math.random() * this.fixed.length);
            slogans.push(this.fixed[randomFixedIndex]);
        }

        // Thêm slogan ngẫu nhiên với majors
        const remainingCount = totalSlogans - minFixedCount;
        const shuffledMajors = majorsInstance.shuffle(); // Gọi shuffle từ instance

        if (remainingCount > 0 && shuffledMajors.length > 0) {
            for (let i = 0; i < remainingCount; i++) {
                const major = shuffledMajors[i % shuffledMajors.length]; // Đảm bảo không vượt quá độ dài
                const randomIndex = Math.floor(Math.random() * this.templates.length);
                slogans.push(this.templates[randomIndex].replace('{major}', major));
            }
        }

        // Xáo trộn toàn bộ danh sách
        return slogans.sort(() => 0.5 - Math.random());
    }
}

// Class quản lý Typewriter
class TypewriterManager {
    constructor(element, slogans) {
        this.typewriter = new Typewriter(element, {
            loop: true,
            delay: 30,
        });
        this.slogans = slogans;
    }

    start() {
        this.slogans.forEach((slogan) => {
            this.typewriter.typeString(slogan).pauseFor(1500).deleteAll(20);
        });
        this.typewriter.start();
        return this.typewriter;
    }
}

// Class quản lý câu hỏi
class QuestionGenerator {
    constructor() {
        this.templates = [
            { title: 'Bạn muốn tìm hiểu về ngành {major} tại HIU?', subTitle: 'Trợ lý ảo sẽ giúp bạn khám phá ngành {major} chi tiết hơn.' },
            { title: 'Học phí ngành {major} tại HIU là bao nhiêu?', subTitle: 'Trợ lý ảo sẽ cung cấp thông tin học phí chính xác cho ngành {major}.' },
            { title: 'Cơ hội nghề nghiệp của ngành {major} như thế nào?', subTitle: 'Hỏi trợ lý ảo để biết triển vọng ngành {major} tại HIU.' },
            { title: 'Bạn có đam mê với ngành {major} không?', subTitle: 'Trợ lý ảo sẽ định hướng cho bạn về ngành {major} tại HIU.' },
            { title: 'Học ngành {major} tại HIU có gì đặc biệt?', subTitle: 'Trợ lý ảo sẽ bật mí những điểm nổi bật của ngành {major}.' },
        ];
        // this.templateColors = ['__blue', '__red', '__purple', '__orange', '__green', '__cyan', '__pink', '__yellow', ''];
        this.templateColors = ['__red', '__blue'];
    }

    generateRandomQuestions(majorsInstance, count) {
        const questions = [];
        const shuffledMajors = majorsInstance.shuffle();

        for (let i = 0; i < count; i++) {
            const major = shuffledMajors[i % shuffledMajors.length];
            const randomTemplateIndex = Math.floor(Math.random() * this.templates.length);
            const randomTemplateColorIndex = Math.floor(Math.random() * this.templateColors.length);
            const template = this.templates[randomTemplateIndex];
            const color = this.templateColors[randomTemplateColorIndex];
            questions.push({
                title: template.title.replace('{major}', major),
                subTitle: template.subTitle.replace('{major}', major),
                color: color,
            });
        }

        return questions;
    }
}

class AskMessage {
    constructor(content) {
        this.content = content;
        this.timestamp = Date.now();
    }
}

class AnswerMessage {
    constructor(content, isError = false, messageError = '') {
        this.content = isError ? messageError : content;
        this.isError = isError;
        this.timestamp = Date.now();
    }
}

class Message {
    constructor(askMessage, answerMessage) {
        this.askMessage = askMessage;
        this.answerMessage = answerMessage;
    }
}

class ChatBotHIUAI {
    BE_URL = 'http://localhost';
    ASK_ENDPOINT = '/api/chat';
    constructor(containerId, inputId, submitButtonId, chatbotId) {
        this.container = document.getElementById(containerId);
        this.input = document.getElementById(inputId);
        this.submitButton = document.getElementById(submitButtonId);
        this.chatbotElement = document.getElementById(chatbotId);
        this.messages = [];
        this.isFetching = false;
        this.answers = ['HIU đào tạo đa ngành với 48 chương trình đại học và nhiều chương trình sau đại học.', 'Có, HIU có các chương trình đào tạo hoàn toàn bằng tiếng Anh.', 'Bạn có thể đăng ký xét tuyển qua website của trường hoặc đến trực tiếp văn phòng tuyển sinh.', 'HIU có nhiều chương trình học bổng hấp dẫn dành cho sinh viên xuất sắc.'];

        this.init();
    }

    init() {
        this.submitButton.addEventListener('click', () => this.handleUserInput());
        this.input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.handleUserInput();
            }
        });
        this.updateChatbotDisplay();
    }

    getRandomAnswer() {
        return this.answers[Math.floor(Math.random() * this.answers.length)];
    }

    async fetchAnswer(question) {
        return new Promise(async (resolve, reject) => {
            const data = {
                query: question,
            };
            try {
                const response = await fetch(this.BE_URL + this.ASK_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok)
                    return reject({
                        httpCode: response.status,
                        status: 'error',
                        message: `Gửi câu hỏi không thành công. ${response.status}`,
                    });

                const resData = await response.json();
                if (resData.status === 'error' || data === null) {
                    return reject({
                        httpCode: response.status,
                        status: 'error',
                        message: resData.message,
                    });
                }
                return resolve({
                    httpCode: response.status,
                    status: resData.status,
                    message: resData.message,
                    data: {
                        ask: resData.data.query,
                        answer: resData.data.response,
                    },
                });
            } catch (error) {
                return reject({
                    httpCode: 500,
                    status: 'error',
                    message: `Gửi câu hỏi không thành công.`,
                });
            }
        });
    }

    async handleUserInput() {
        if (this.isFetching) return;

        const question = this.input.value.trim();
        if (!question) return;

        this.isFetching = true;
        this.submitButton.disabled = true;
        this.input.disabled = true;

        const askMessage = new AskMessage(question);
        this.addMessage(askMessage, 'Bạn');
        this.input.value = '';

        this.showTypingIndicator();

        try {
            const answer = (await this.fetchAnswer(question)).data.answer;
            const answerMessage = new AnswerMessage(answer);
            this.hideTypingIndicator();
            // this.addTypingMessage(answerMessage);
            this.addMessage(answerMessage, 'HIU-AI');
        } catch (error) {
            console.log(error);
            const answerMessage = new AnswerMessage('', true, error.message);
            this.hideTypingIndicator();
            // this.addTypingMessage(answerMessage);
            this.addMessage(answerMessage, 'HIU-AI');
        }

        this.isFetching = false;
        this.submitButton.disabled = false;
        this.input.disabled = false;
    }

    showTypingIndicator() {
        this.typingIndicator = document.createElement('div');
        this.typingIndicator.className = 'chat-history__message';
        this.typingIndicator.innerHTML = `
            <div class="message__logo">
                <div class="hiu-ai"><strong class="hiu">HIU</strong> <strong class="ai">AI</strong></div>
                <div class="time-send">${new Date().toLocaleTimeString()}</div>
            </div>
            <div class="message__message-content typing skeleton"></div>
        `;
        this.container.appendChild(this.typingIndicator);
        this.updateChatbotDisplay();
    }

    hideTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.remove();
            this.typingIndicator = null;
        }
    }

    addMessage(message, sender) {
        const messageClass = sender === 'HIU-AI' ? 'chat-history__message' : 'chat-history__message message--right';
        const senderHTML = sender === 'HIU-AI' ? `<div class="hiu-ai"><strong class="hiu">HIU</strong> <strong class="ai">AI</strong></div>` : `<span>Bạn</span>`;

        const messageHTML = `
            <div class="${messageClass}">
                <div class="message__logo">
                    ${senderHTML}
                    <div class="time-send">${new Date(message.timestamp).toLocaleTimeString()}</div>
                </div>
                <div class="message__message-content">${message.content}</div>
            </div>
        `;

        this.messages.push(message);
        this.container.innerHTML += messageHTML;
        this.updateChatbotDisplay();
    }

    addTypingMessage(message) {
        const messageClass = 'chat-history__message';
        const senderHTML = `<div class="hiu-ai"><strong class="hiu">HIU</strong> <strong class="ai">AI</strong></div>`;

        const messageElement = document.createElement('div');
        messageElement.className = messageClass;
        messageElement.innerHTML = `
            <div class="message__logo">
                ${senderHTML}
                <div class="time-send">${new Date(message.timestamp).toLocaleTimeString()}</div>
            </div>
            <div class="message__message-content"></div>
        `;

        this.container.appendChild(messageElement);
        this.typewriterEffect(messageElement.querySelector('.message__message-content'), message.content);
        this.updateChatbotDisplay();
    }

    typewriterEffect(element, text) {
        let index = 0;
        const speed = 30;

        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(() => {
                    this.updateChatbotDisplay();
                    type();
                }, speed);
            }
        };
        type();
    }

    updateChatbotDisplay() {
        if (this.chatbotElement) {
            this.chatbotElement.setAttribute('data-display-welcome', this.container.children.length === 0 ? 'true' : 'false');
        }
        this.container.scrollTop = this.container.scrollHeight;
    }
}

function toggleFullScreenChatbotHIUAI() {
    let elem = document.getElementById('hiu_chatbot_ai');
    let btnImg = document.querySelector('#chatbot__fullscreen img');
    let isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!document.fullscreenElement && !document.webkitFullscreenElement && !elem.classList.contains('ios-fullscreen')) {
        if (isIOS) {
            // Fake fullscreen bằng cách làm div full màn hình
            elem.classList.add('ios-fullscreen');
            document.body.classList.add('no-scroll'); // Khóa scroll
            btnImg.src = './public/images/collapse-fullscreen-icon.png';
        } else {
            elem.requestFullscreen().then(() => {
                btnImg.src = './public/images/collapse-fullscreen-icon.png';
                elem.classList.add('full-screen-mode');
            });
        }
    } else {
        if (elem.classList.contains('ios-fullscreen')) {
            elem.classList.remove('ios-fullscreen');
            document.body.classList.remove('no-scroll'); // Mở khóa scroll
            btnImg.src = './public/images/fullscreen-icon.png';
            elem.scrollIntoView();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }

            btnImg.src = './public/images/fullscreen-icon.png';
            elem.classList.remove('full-screen-mode');
            elem.scrollIntoView();
        }
    }
}

// Lắng nghe sự kiện thoát fullscreen
document.addEventListener('fullscreenchange', exitFullScreenHandler);
document.addEventListener('webkitfullscreenchange', exitFullScreenHandler);
document.addEventListener('mozfullscreenchange', exitFullScreenHandler);
document.addEventListener('MSFullscreenChange', exitFullScreenHandler);

function exitFullScreenHandler() {
    let elem = document.getElementById('hiu_chatbot_ai');
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
        let btnImg = document.querySelector('#chatbot__fullscreen img');
        btnImg.src = './public/images/fullscreen-icon.png';
        elem.classList.remove('full-screen-mode');
        document.body.classList.remove('no-scroll'); // Mở khóa scroll khi thoát fullscreen
        elem.scrollIntoView();
    }
}

// Khởi tạo và sử dụng các class
document.addEventListener('DOMContentLoaded', () => {
    const majors = new Majors();
    const sloganGen = new SloganGenerator();
    const questionGen = new QuestionGenerator();

    // Tạo danh sách slogan
    const sloganList = sloganGen.generateRandomSlogans(majors);
    // console.log('Slogan List:', sloganList); // Debug để kiểm tra danh sách
    const welcomeMessage = document.querySelector('.welcome_message__main_message .message');
    const typewriterManager = new TypewriterManager(welcomeMessage, sloganList);
    typewriterManager.start();

    // Tạo danh sách câu hỏi
    const randomQuestions = questionGen.generateRandomQuestions(majors, 30);
    const questionsList = document.querySelector('.questions-list.swiper-wrapper');
    questionsList.innerHTML = randomQuestions
        .map(
            (q) => `
        <div class="question ${q.color} swiper-slide">
          <div class="question__title">${q.title}</div>
          <div class="question__sub-title">${q.subTitle}</div>
        </div>
      `,
        )
        .join('');

    const swiper = new Swiper('.swiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: false, // Kiểm tra xem có fix lỗi không
        autoplay: { delay: 5000 },
        breakpoints: {
            1024: { slidesPerView: 4, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 10 },
            0: { slidesPerView: 1, spaceBetween: 100 },
        },
    });

    // Sử dụng ChatBotHIUAI
    const chatBot = new ChatBotHIUAI('chat-history', 'hiu-ai__chat-input', 'hiu-ai__chat-submit', 'chatbot');
});
