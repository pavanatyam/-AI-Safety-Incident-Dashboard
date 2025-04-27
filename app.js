var incidents = [
    {
        id: 1,
        title: "Biased Recommendation Algorithm",
        description: "Algorithm consistently favored certain demographics...",
        severity: "Medium",
        reported_at: "2025-03-15T10:00:00Z"
    },
    {
        id: 2,
        title: "LLM Hallucination in Critical Info",
        description: "LLM provided incorrect safety procedure information...",
        severity: "High",
        reported_at: "2025-04-01T14:30:00Z"
    },
    {
        id: 3,
        title: "Minor Data Leak via Chatbot",
        description: "Chatbot inadvertently exposed non-sensitive user metadata...",
        severity: "Low",
        reported_at: "2025-03-20T09:15:00Z"
    }
];
var expandedIds = new Set();
function renderIncidents() {
    var list = document.getElementById('incident-list');
    list.innerHTML = '';
    var filtered = incidents;
    var severityFilter = document.getElementById('filterSeverity').value;
    var sortOrder = document.getElementById('sortDate').value;
    if (severityFilter !== 'All') {
        filtered = filtered.filter(function (incident) { return incident.severity === severityFilter; });
    }
    if (sortOrder === 'newest') {
        filtered.sort(function (a, b) { return new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime(); });
    }
    else {
        filtered.sort(function (a, b) { return new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime(); });
    }
    var _loop_1 = function (incident) {
        var card = document.createElement('div');
        card.className = 'incident-card';
        var title = document.createElement('h3');
        title.innerText = incident.title;
        var severity = document.createElement('p');
        severity.innerText = "Severity: ".concat(incident.severity);
        var date = document.createElement('p');
        date.innerText = "Reported: ".concat(new Date(incident.reported_at).toLocaleDateString());
        var viewButton = document.createElement('button');
        viewButton.innerText = expandedIds.has(incident.id) ? 'Hide Details' : 'View Details';
        viewButton.onclick = function () {
            if (expandedIds.has(incident.id)) {
                expandedIds.delete(incident.id);
            }
            else {
                expandedIds.add(incident.id);
            }
            renderIncidents();
        };
        card.appendChild(title);
        card.appendChild(severity);
        card.appendChild(date);
        card.appendChild(viewButton);
        if (expandedIds.has(incident.id)) {
            var description = document.createElement('div');
            description.className = 'description';
            description.innerText = incident.description;
            card.appendChild(description);
        }
        list.appendChild(card);
    };
    for (var _i = 0, filtered_1 = filtered; _i < filtered_1.length; _i++) {
        var incident = filtered_1[_i];
        _loop_1(incident);
    }
}
function setupEventListeners() {
    document.getElementById('filterSeverity').addEventListener('change', renderIncidents);
    document.getElementById('sortDate').addEventListener('change', renderIncidents);
    document.getElementById('report-form').addEventListener('submit', function (event) {
        event.preventDefault();
        var titleInput = document.getElementById('title');
        var descriptionInput = document.getElementById('description');
        var severitySelect = document.getElementById('severity');
        if (!titleInput.value.trim() || !descriptionInput.value.trim() || !severitySelect.value) {
            alert('Please fill out all fields.');
            return;
        }
        var newIncident = {
            id: incidents.length + 1,
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            severity: severitySelect.value,
            reported_at: new Date().toISOString()
        };
        incidents.push(newIncident);
        // Reset form
        titleInput.value = '';
        descriptionInput.value = '';
        severitySelect.value = 'Low';
        renderIncidents();
    });
}
// Initialize the page
setupEventListeners();
renderIncidents();
