const serverAddr = 'http://10.129.254.190:8080';
const serverAddrWS = 'ws://10.129.254.190:8080';

const gotoLogin = (count) => {
    if (!('value' in count)) {
        console.error('argument must have a property: value');
        throw new Error('argument must have a property: value');
    }

    const countDown = setInterval(() => {
        count.value--;
        if (count.value === 0) {
            clearInterval(countDown);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = './login.html';
        }
    }, 1000);
};

const checkAuth = (refreshToken) => {
    if (typeof refreshToken !== 'string') {
        console.error('argument must be a string');
        throw new TypeError('argument must be a string');
    }

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', serverAddr + '/refreshToken', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve({
                        status: xhr.status,
                        response: JSON.parse(xhr.responseText)
                    });
                } else {
                    reject({
                        status: xhr.status,
                        error: JSON.parse(xhr.responseText).msg
                    });
                }
            }
        };

        xhr.onerror = () => {
            reject({
                status: xhr.status,
                error: 'Network Error'
            });
        };

        xhr.send(JSON.stringify({ refreshToken }));

    });
};

const updateAccessToken = () => {

};

export { gotoLogin, checkAuth, serverAddr, updateAccessToken, serverAddrWS };