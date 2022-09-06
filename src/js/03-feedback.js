const form = document.querySelector('.feedback-form')
const nameKey = 'feedback-form-state';
initPage();

function handleInput(e) {
    const { name, value } = e.target;

    try {
        let savedData = localStorage.getItem(nameKey);
        if (savedData) {
            savedData = JSON.parse(savedData);
        } else {
            savedData = {};
        };

        savedData[name] = value;
        const formDataJSON = JSON.stringify(savedData);
        localStorage.setItem(nameKey, formDataJSON); 
    } catch (error) {
        console.error(error.message);
    };
};

form.addEventListener('input', _.throttle(handleInput, 500));


function initPage() {
    try {
        const savedData = localStorage.getItem(nameKey);
    if (!savedData) {
        return;
    };
        const savedDataObj = JSON.parse(savedData);

        Object.entries(savedDataObj).forEach(([name, value]) => {
            form.elements[name].value = value;
        });
    } catch (error) {
        console.error(error.message);
    };
};

form.addEventListener('submit', handleSubmit);


function handleSubmit (e) {
    e.preventDefault();
    const {elements: { name, email, message }} = e.currentTarget;

    console.log({ name: name.value, email: email.value, message: message.value });
    e.currentTarget.reset();

    localStorage.removeItem(nameKey); 
};
