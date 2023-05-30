document.addEventListener("DOMContentLoaded", function () {
    let stepsData = [
        {
            title: "Virtual Environment Setup",
            text: "After downloading the Git repository and accessing it through an integrated development environment (IDE) like Visual Studio Code, please proceed by executing the following code snippets in a terminal running with administrator privileges. These code snippets are designed to set up a Python virtual environment. The virtual environment isolates our Flask application, keeping it modular and self-contained, reducing potential conflicts between its dependencies and other Python applications. The requirements.txt file lists all the necessary Python libraries our app needs to function correctly. Upon activating the virtual environment with venv\\Scripts\\activate, the command pip install -r requirements.txt ensures the proper installation of these dependencies, enabling the smooth initialization and running of our Flask app. Please remember to run these commands from the Login page directory.",
            code: ["python -m venv venv","venv\\Scripts\\activate","pip install -r requirements.txt","flask run"],
            image: "./venv.jpg",
            aside: {
                label: "",
                note: "CAT",
                'aside-image': './Alicecat.png'
            }
        },
        {
            title: "Database Initialization",
            text: "The database is designed to be automatically created and initialized alongside the first run of the Flask application. During this initialization, the database is seeded with data via the seed_db.py Python function. However, if for some reason the database is not properly initialized or seeded, you can manually re-instantiate it. To do this, follow the steps outlined below, entering each command into a terminal located in the ./Login Page directory one at a time.",
            code: ["rm app.db","rm -r migrations/","flask db init","flask db migrate -m 'upgrading'","flask db upgrade"],
            image: "./Re_Start_Db.jpg",
            aside: {
                label: "Object Relational Mapping",
                note: "SQLAlchemy allows us to work with Relational Databases in Python efficiently and provides us with a high degree of abstraction. Models (or tables in the database) are defined as Python classes, and SQLAlchemy then allows us to interact with these tables as if they were Python objects. Creating a new row in a table is as simple as creating a new instance of a model and adding it to the session. SQLAlchemy also simplifies the task of writing complex SQL queries. In our project, for instance, we use SQLAlchemy in the 'history' route to fetch and filter questions and the user's answers from the database. This is done using methods like `Question.query.all()` or `UserQuestionAnswer.query.filter_by()`, which behind the scenes, convert these commands to raw SQL queries and execute them. The following is the code for the ./history route which queries the database for the user's answers to a specific question that contains the string in the search feild.",
                'aside-image': './History_code.jpg'
            }
        },
        {
            title: "Running the App",
            text: "Once the virtual environment is set up and the database is initialized, the app can be run. To do this, simply run the following command from the Login page directory. The app will then be accessible from a web browser at the address http://localhost:5000/. The app can be stopped by pressing CTRL+C in the terminal. To restart the app, simply run the same command again. Register a new user or log in with the following credentials: Username: test_user, Password: test_password.",
            code: ["flask run"],
            image: "./Flask_Run.jpg",
            aside: {
                label: "Routing",
                note: "In a Flask application, routes play a critical role by handling HTTP requests and responses between the client and server in a stateless architecture. Each route is a Python function that gets executed when a specific URL is accessed. This project's routes (e.g., '/login', '/register', '/logout') manage user authentication and session tracking. For instance, the '/login' route responds to both GET and POST requests. It processes the incoming user credentials and authenticates the user by querying the database. If the credentials are valid, it initializes a session for the authenticated user. The '/register' route also handles GET and POST requests, but instead of authenticating, it validates and processes user data for a new account. It checks constraints such as password length, uniqueness of the username, validity of the email, and ensures passwords match. Once data is validated, it stores the new user in the database. This routing mechanism is an example of Flask's functionality and simplicity, it allows for the efficient management of stateless client-server communication.",
                'aside-image': './Route_login.jpg'
            }
        },        
        {
            title: "Testing",
            text: "Automated testing in our app improves maintainability, removing the necessity for the Flask app to be continuously running during the testing phase. Each test initiates an independent instance of the application, focusing either on unit testing or Selenium-based browser testing. Our Selenium tests are divided into two distinct runs, examining user registration and login functionalities, and testing chat functionality and all the routes that can be accessed. During the Selenium tests, a random string of characters is generated, creating unique usernames and passwords for each instance. Unit testing refers to the database and server-side architecture. These tests include verifying multiple responses from a single user and executing methods like test_user_question_answer_without_user_or_question, test_multiple_sessions_for_user, test_create_session, and others. To start the Selenium and Python Unit tests, simply run the specified command from the Login page directory.",
            code: ["python autoSelenium.py", "python -m unittest testing.unitTests"],
            image: "./Selenium_test.jpg",
            aside: {
                label: "",
                note: ""
            }
        }
        
    ];

    let stepsContainer = document.getElementById("steps");

    for (let step of stepsData) {
        stepsContainer.appendChild(createStepElement(step));
    }

    stepsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('copy-btn')) {
            copyToClipboard(event.target);
        } else if (event.target.classList.contains('aside-button')) {
            toggleAside(event.target);
        }
    });

    const sectionTitles = document.querySelectorAll('.collapsible-title');

    sectionTitles.forEach(title => {
        title.addEventListener('click', function() {
            const sectionContent = title.nextElementSibling;
            sectionContent.style.display = sectionContent.style.display === "none" ? "block" : "none";
        });
    });
});

function createStepElement(step) {
    let stepElement = document.createElement("div");
    stepElement.classList.add("step");

    let codeBlock = "";
    if (step.code) {
        codeBlock = step.code.map(code => `
            <div class="code-container">
                <p>${code}</p>
                <button class="copy-btn">Copy Code</button>
            </div>
        `).join("");
    }

    let asideBlock = "";
    if (step.aside) {
        let asideImage = "";
        if (step.aside['aside-image']) {
            asideImage = `<img style="display: none;" src="${step.aside['aside-image']}" alt="${step.aside.label}">`;
        }
    
        if (step.aside.note && step.aside.note.trim() !== '') {
            asideBlock = `
                <button class="aside-button" style="font-family: inherit; font-size: inherit;">${step.aside.label}</button>
                <aside style="display: none;">${step.aside.note}${asideImage}</aside>
            `;
        }
    }
    

    stepElement.innerHTML = `
        <div class="header">
            <h3>${step.title}</h3>
        </div>
        ${asideBlock}
        <p>${step.text}</p>
        ${codeBlock}
        <img class="image-container" src="${step.image}" alt="${step.title}">
    `;

    return stepElement;
}

function toggleAside(button) {
    let aside = button.nextElementSibling;
    aside.style.display = aside.style.display === "none" ? "block" : "none";
    let asideImage = aside.querySelector('img');
    if (asideImage) {
        asideImage.style.display = asideImage.style.display === "none" ? "block" : "none";
    }
}

function copyToClipboard(btn) {
    let textToCopy = btn.previousElementSibling.innerText;
    navigator.clipboard.writeText(textToCopy)
    .then(() => {
        alert('Code copied to clipboard');
    })
    .catch(err => {
        console.error('Could not copy text: ', err);
    });
}