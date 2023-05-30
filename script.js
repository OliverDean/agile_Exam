document.addEventListener("DOMContentLoaded", function () {
    let stepsData = [
        {
            title: "Virtual Environment Setup",
            text: "",
            code: ["python -m venv venv","venv\\Scripts\\activate","pip install -r requirements.txt"],
            image: "",
            aside: {
                label: "",
                note: ""
            }
        },
        {
            title: "Database Initialization",
            text: "The database is designed to be automatically created and initialized alongside the first run of the Flask application. During this initialization, the database is seeded with data via the seed_db.py Python function. However, if for some reason the database is not properly initialized or seeded, you can manually re-instantiate it. To do this, follow the steps outlined below, entering each command into a terminal located in the ./Login Page directory one at a time.",
            code: ["rm app.db","rm -r migrations/","flask db init","flask db migrate -m 'upgrading'","flask db upgrade"],
            image: "./Re_Start_Db.jpg",
            aside: {
                label: "Object Relational Mapping",
                note: "SQLAlchemy allows us to work with Relational Databases in Python efficiently and provides us with a high degree of abstraction. Models (or tables in the database) are defined as Python classes, and SQLAlchemy then allows us to interact with these tables as if they were Python objects. Creating a new row in a table is as simple as creating a new instance of a model and adding it to the session. SQLAlchemy also simplifies the task of writing complex SQL queries. In our project, for instance, we use SQLAlchemy in the 'history' route to fetch and filter questions and the user's answers from the database. This is done using methods like `Question.query.all()` or `UserQuestionAnswer.query.filter_by()`, which behind the scenes, convert these commands to raw SQL queries and execute them.",
                'aside-image': './History_code.jpg'
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
        <img src="${step.image}" alt="${step.title}">
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