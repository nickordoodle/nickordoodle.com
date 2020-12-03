var mainContentContainer = document.getElementById("main-container");
var descriptionTextInput = document.getElementById("description-search");
var locationTextInput = document.getElementById("location-search");
var filterFullTimeBtn;
var filterPartTimeBtn;
var findJobsBtn;
var currentJobData = [];


initAllButtons();


function showJobs(desc, location) {
    let baseQuery = "https://jobs.github.com/positions.json?";
    let description = "description=" + desc;
    let concatter = "&";
    let loc = "location=" + location;
    let axiosQuery = baseQuery + description + concatter + loc;
    axios.get(axiosQuery)
        .then(function (res) {
            let jobsFromAxiosResponse = res.data;
            currentJobData = [];
            removeAllChildNodes(mainContentContainer);
            jobsFromAxiosResponse.map(job => {
                createJobCard(mainContentContainer, job.company_logo, job.title, job.description, job.how_to_apply);
                currentJobData.push(job);
            });
        })
        .catch(err => console.log(err));
}



function changeJobData(filterType) {
    let updatedJobDataContainer = [];
    updatedJobDataContainer = currentJobData.filter(job => {
        let isJobValid = (job.type === filterType);
        return isJobValid;
    });
    return updatedJobDataContainer;
}

// Clears current content and inserts new content
// The parameter newData is an expected list of jobs
// that is not currently being shown.Creates a job card
// for each job in the newData list
function refreshContent(newData) {
    removeAllChildNodes(mainContentContainer);
    newData.map(job => {
        createJobCard(mainContentContainer, job.company_logo, job.title, job.description, job.how_to_apply);
    });
}

// Clears all children of the passed in HTML container/parent. 
// So if div X is passed in with 3 "p" children, it will remove
// all of those p tags
function removeAllChildNodes(parentNode) {
    parentNode.innerHTML = '';
}

// Validates user input
// Checks that at least one of the parameters,
// description or location has a value
function isJobInputValid(desc, loc) {
    if (desc.length < 1 && loc.length < 1) {
        return false;
    }
    return true;
}

function createJobCard(containerParent, companyImgSrc, jobTitle, jobDesc, jobHowToApply) {

    let outsideContainer = document.createElement("div");
    outsideContainer.className = "col-xs-1-12";
    outsideContainer.className = "content-item";
    let cardContainer = document.createElement("div");
    cardContainer.className = "card";
    cardContainer.style.boxShadow = "8px 8px 3px grey";

    outsideContainer.appendChild(cardContainer);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    cardContainer.appendChild(cardBody);

    let jobCompanyImg = document.createElement("img");
    jobCompanyImg.src = companyImgSrc;

    // jobCompanyImg.style.width = "15vw";
    // jobCompanyImg.style.height = "15vh";

    let jobTitleH3 = document.createElement("h3");
    jobTitleH3.className = "card-title";
    jobTitleH3.textContent = jobTitle;

    let jobDescP = document.createElement("p");
    jobDescP.innerHTML = jobDesc.substring(0, 100) + "...";

    let jobHowToApplyP = document.createElement("p");
    jobHowToApplyP.innerHTML = jobHowToApply;

    let jobApplicationLinkBtn = document.createElement("button");
    jobApplicationLinkBtn.innerHTML = "Details";
    jobApplicationLinkBtn.addEventListener("click", () => {
        let fullDesc = jobDesc;
        jobDescP.innerHTML = fullDesc;
    });
    jobApplicationLinkBtn.className = "btn btn-primary";

    cardBody.appendChild(jobCompanyImg);
    cardBody.appendChild(jobTitleH3);
    cardBody.appendChild(jobDescP);
    cardBody.appendChild(jobHowToApplyP);
    cardBody.appendChild(jobApplicationLinkBtn);

    containerParent.appendChild(outsideContainer);
}

function initAllButtons() {
    filterFullTimeBtn = document.getElementById("filter-full-time-btn");
    filterFullTimeBtn.addEventListener("click", () => {
        let updatedJobData = [...changeJobData("Full Time")];
        refreshContent(updatedJobData);
    });

    filterPartTimeBtn = document.getElementById("filter-part-time-btn");
    filterPartTimeBtn.addEventListener("click", () => {
        let updatedJobData = [...changeJobData("Part Time")];
        refreshContent(updatedJobData);
    });

    findJobsBtn = document.getElementById("find-jobs-btn");
    findJobsBtn.addEventListener("click", () => {
        let descQuery = descriptionTextInput.value;
        let locQuery = locationTextInput.value;
        if (isJobInputValid(descQuery, locQuery)) {
            showJobs(descQuery, locQuery);
        } else {
            alert("Please enter a value for description, location or both.")
        }
    });
}