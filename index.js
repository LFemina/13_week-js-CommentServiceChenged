const form = document.querySelector('form');
        const submitButton = document.getElementById('btn');

        function checkSpam(str) {
            return str.replace(/viagra|XXX/ig, '***');
        }

        function messageFormHandler() {
            /*получаем все данные формы*/
            const formData = new FormData(form);

            const result = {
                username: '',
                image: '',
                message: '',
                isValid: true,
            };

            const nowTime = new Date();


            formData.forEach((value, key) => {
                let cleanValue = value.trim();

                if (key === 'username') {
                    cleanValue = cleanValue.charAt(0).toUpperCase() + cleanValue.slice(1).toLowerCase();
                }

                if (key === 'message') {
                    cleanValue = checkSpam(cleanValue);
                }

                result[key] = cleanValue;
            });

            if (!result.message) {
                alert("Пожалуйста, заполните поле сообщения.");
                return;
            }

            const randomImage = [
                'images/img1.jpg',
                'images/img2.jpg',
                'images/img3.jpg',
                'images/img4.jpg',
                'images/img5.jpg',
                'images/img6.jpg',
            ];

            const getRandomImage = () => randomImage[Math.floor(Math.random() * randomImage.length)];
            let pict = getRandomImage();

            function showMessage(relult) {
                const newMessage = document.createElement('div');
                newMessage.classList.add("chat-result");

                const img = document.createElement('img');
                img.classList.add("chat-img");

                const userName = document.createElement('p');
                userName.classList.add("chat-username");

                const timeNow = document.createElement('p');
                timeNow.classList.add("chat-time");

                const text = document.createElement('p');
                text.classList.add("chat-text");

                img.src = document.getElementById('image').value ? result.image : pict;
                userName.innerText = document.getElementById('checkbox').checked ? result.username : "username";
                timeNow.innerText = nowTime.toLocaleString();
                text.innerText = result.message;

                newMessage.appendChild(img);
                newMessage.appendChild(userName);
                newMessage.appendChild(timeNow);
                newMessage.appendChild(text);

                const messageList = document.querySelector('section:nth-child(2)');
                messageList.appendChild(newMessage);

                document.querySelector('.chat-form-input').value = '';
                document.getElementById('image').value = '';
                document.querySelector('.chat-form-message').value = '';
            }
            showMessage();
        }
        submitButton.addEventListener('click', messageFormHandler);