interface Incident {
    id: number;
    title: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High';
    reported_at: string;
  }
  
  let incidents: Incident[] = [
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
  
  let expandedIds: Set<number> = new Set();
  
  function renderIncidents() {
    const list = document.getElementById('incident-list')!;
    list.innerHTML = '';
  
    let filtered = incidents;
  
    const severityFilter = (document.getElementById('filterSeverity') as HTMLSelectElement).value;
    const sortOrder = (document.getElementById('sortDate') as HTMLSelectElement).value;
  
    if (severityFilter !== 'All') {
      filtered = filtered.filter(incident => incident.severity === severityFilter);
    }
  
    if (sortOrder === 'newest') {
      filtered.sort((a, b) => new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime());
    } else {
      filtered.sort((a, b) => new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime());
    }
  
    for (let incident of filtered) {
      const card = document.createElement('div');
      card.className = 'incident-card';
  
      const title = document.createElement('h3');
      title.innerText = incident.title;
  
      const severity = document.createElement('p');
      severity.innerText = `Severity: ${incident.severity}`;
  
      const date = document.createElement('p');
      date.innerText = `Reported: ${new Date(incident.reported_at).toLocaleDateString()}`;
  
      const viewButton = document.createElement('button');
      viewButton.innerText = expandedIds.has(incident.id) ? 'Hide Details' : 'View Details';
      viewButton.onclick = () => {
        if (expandedIds.has(incident.id)) {
          expandedIds.delete(incident.id);
        } else {
          expandedIds.add(incident.id);
        }
        renderIncidents();
      };
  
      card.appendChild(title);
      card.appendChild(severity);
      card.appendChild(date);
      card.appendChild(viewButton);
  
      if (expandedIds.has(incident.id)) {
        const description = document.createElement('div');
        description.className = 'description';
        description.innerText = incident.description;
        card.appendChild(description);
      }
  
      list.appendChild(card);
    }
  }
  
  function setupEventListeners() {
    document.getElementById('filterSeverity')!.addEventListener('change', renderIncidents);
    document.getElementById('sortDate')!.addEventListener('change', renderIncidents);
  
    document.getElementById('report-form')!.addEventListener('submit', (event) => {
      event.preventDefault();
      const titleInput = document.getElementById('title') as HTMLInputElement;
      const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
      const severitySelect = document.getElementById('severity') as HTMLSelectElement;
  
      if (!titleInput.value.trim() || !descriptionInput.value.trim() || !severitySelect.value) {
        alert('Please fill out all fields.');
        return;
      }
  
      const newIncident: Incident = {
        id: incidents.length + 1,
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        severity: severitySelect.value as 'Low' | 'Medium' | 'High',
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
  