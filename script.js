// Wait for the page to load
document.addEventListener('DOMContentLoaded', function () {
    // Get all topics
    let topics = document.getElementsByClassName('topic');

    // Iterate through topics to add interactivity
    for (let i = 0; i < topics.length; i++) {
        // Add click event to topic header to toggle content visibility
        topics[i].querySelector('h3').addEventListener('click', function() {
            // Get all the children of the topic div
            let content = this.parentNode.children;
            for(let j = 0; j < content.length; j++){
                // Skip the header element
                if(content[j].tagName != "H3"){
                    if (content[j].style.display === 'none') {
                        content[j].style.display = 'block';
                    } else {
                        content[j].style.display = 'none';
                    }
                }
            }
        });

        // Add input event to notes textarea to change text color based on length
        topics[i].querySelector('.notes').addEventListener('input', function() {
            if (this.value.length > 1000) {
                this.style.color = 'red';
            } else {
                this.style.color = 'black';
            }
        });

        // Add change event to concept checkboxes to change topic background color when all are checked
        let checkboxes = topics[i].querySelectorAll('.concepts input[type=checkbox]');
        for (let j = 0; j < checkboxes.length; j++) {
            checkboxes[j].addEventListener('change', function() {
                let allChecked = true;
                for (let k = 0; k < checkboxes.length; k++) {
                    if (!checkboxes[k].checked) {
                        allChecked = false;
                        break;
                    }
                }

                if (allChecked && topics[i].querySelector('.notes').value.length > 0) {
                    topics[i].style.backgroundColor = 'green';
                } else {
                    topics[i].style.backgroundColor = '';
                }
            });
        }
    }
});
