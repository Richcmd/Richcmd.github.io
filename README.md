<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>TaskFlow tekst in de readme</title>

  <style>
    *{
      margin:0;
      padding:0;
      box-sizing:border-box;
      font-family:Inter, sans-serif;
    }

    body{
      background:#0f172a;
      color:white;
      min-height:100vh;
      display:flex;
    }

    .sidebar{
      width:260px;
      background:#111827;
      padding:25px;
      border-right:1px solid rgba(255,255,255,0.08);
    }

    .logo{
      font-size:28px;
      font-weight:700;
      margin-bottom:40px;
      color:#38bdf8;
    }

    .menu{
      display:flex;
      flex-direction:column;
      gap:14px;
    }

    .menu button{
      background:#1e293b;
      color:white;
      border:none;
      padding:14px;
      border-radius:14px;
      cursor:pointer;
      transition:0.2s;
      font-size:15px;
      text-align:left;
    }

    .menu button:hover{
      background:#38bdf8;
      color:black;
    }

    .main{
      flex:1;
      padding:40px;
    }

    h1{
      margin-bottom:25px;
      font-size:34px;
    }

    .topbar{
      display:flex;
      gap:15px;
      margin-bottom:30px;
      flex-wrap:wrap;
    }

    input, select, textarea{
      background:#1e293b;
      border:none;
      color:white;
      padding:14px;
      border-radius:14px;
      outline:none;
    }

    button.add{
      background:#38bdf8;
      border:none;
      color:black;
      font-weight:600;
      padding:14px 20px;
      border-radius:14px;
      cursor:pointer;
    }

    .task-list{
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
      gap:20px;
    }

    .task{
      background:#1e293b;
      padding:20px;
      border-radius:20px;
      position:relative;
      overflow:hidden;
    }

    .task h3{
      margin-bottom:10px;
    }

    .task small{
      opacity:0.7;
    }

    .badge{
      position:absolute;
      top:15px;
      right:15px;
      padding:6px 12px;
      border-radius:30px;
      font-size:12px;
      font-weight:600;
    }

    .daily{
      background:#22c55e;
      color:black;
    }

    .weekly{
      background:#f59e0b;
      color:black;
    }

    .monthly{
      background:#a855f7;
      color:white;
    }

    .notes-page{
      display:none;
    }

    textarea{
      width:100%;
      min-height:300px;
      resize:none;
      margin-top:20px;
      font-size:16px;
    }

    .stats{
      display:flex;
      gap:20px;
      margin-bottom:30px;
      flex-wrap:wrap;
    }

    .card{
      background:#1e293b;
      padding:20px;
      border-radius:20px;
      min-width:180px;
    }

    .card h2{
      margin-top:10px;
      color:#38bdf8;
    }

    @media(max-width:900px){
      body{
        flex-direction:column;
      }

      .sidebar{
        width:100%;
      }
    }
  </style>
</head>
<body>

  <div class="sidebar">
    <div class="logo">TaskFlow</div>

    <div class="menu">
      <button onclick="showTasks()">📋 Taken</button>
      <button onclick="showNotes()">📝 Notities</button>
      <button onclick="clearTasks()">🗑️ Alles verwijderen</button>
    </div>
  </div>

  <div class="main">

    <div id="tasksPage">
      <h1>Mijn Taken</h1>

      <div class="stats">
        <div class="card">
          <small>Dagelijkse Taken</small>
          <h2 id="dailyCount">0</h2>
        </div>

        <div class="card">
          <small>Wekelijkse Taken</small>
          <h2 id="weeklyCount">0</h2>
        </div>

        <div class="card">
          <small>Maandelijkse Taken</small>
          <h2 id="monthlyCount">0</h2>
        </div>
      </div>

      <div class="topbar">
        <input type="text" id="taskInput" placeholder="Nieuwe taak...">

        <select id="repeatType">
          <option value="daily">Dagelijks</option>
          <option value="weekly">Wekelijks</option>
          <option value="monthly">Maandelijks</option>
        </select>

        <button class="add" onclick="addTask()">Toevoegen</button>
      </div>

      <div class="task-list" id="taskList"></div>
    </div>

    <div class="notes-page" id="notesPage">
      <h1>Notities</h1>

      <textarea id="notesArea" placeholder="Schrijf hier je notities..."></textarea>
    </div>

  </div>

  <script>
    let tasks = JSON.parse(getCookie("tasks") || "[]");

    function saveTasks(){
      document.cookie = "tasks=" + JSON.stringify(tasks) + ";path=/;max-age=31536000";
    }

    function getCookie(name){
      let value = "; " + document.cookie;
      let parts = value.split("; " + name + "=");

      if(parts.length === 2){
        return parts.pop().split(";").shift();
      }
    }

    function addTask(){
      const input = document.getElementById("taskInput");
      const repeat = document.getElementById("repeatType");

      if(input.value.trim() === "") return;

      tasks.push({
        title: input.value,
        repeat: repeat.value,
        created: new Date().toISOString()
      });

      saveTasks();
      renderTasks();

      input.value = "";
    }

    function renderTasks(){
      const list = document.getElementById("taskList");
      list.innerHTML = "";

      let daily = 0;
      let weekly = 0;
      let monthly = 0;

      tasks.forEach((task,index)=>{

        if(task.repeat === "daily") daily++;
        if(task.repeat === "weekly") weekly++;
        if(task.repeat === "monthly") monthly++;

        list.innerHTML += `
          <div class="task">
            <div class="badge ${task.repeat}">
              ${task.repeat}
            </div>

            <h3>${task.title}</h3>

            <small>
              Toegevoegd op:
              ${new Date(task.created).toLocaleDateString()}
            </small>

            <br><br>

            <button onclick="deleteTask(${index})"
              style="
                background:#ef4444;
                border:none;
                padding:10px 14px;
                border-radius:10px;
                color:white;
                cursor:pointer;
              ">
              Verwijderen
            </button>
          </div>
        `;
      });

      document.getElementById("dailyCount").innerText = daily;
      document.getElementById("weeklyCount").innerText = weekly;
      document.getElementById("monthlyCount").innerText = monthly;
    }

    function deleteTask(index){
      tasks.splice(index,1);
      saveTasks();
      renderTasks();
    }

    function clearTasks(){
      if(confirm("Weet je zeker dat je alles wilt verwijderen?")){
        tasks = [];
        saveTasks();
        renderTasks();
      }
    }

    function showNotes(){
      document.getElementById("tasksPage").style.display = "none";
      document.getElementById("notesPage").style.display = "block";
    }

    function showTasks(){
      document.getElementById("tasksPage").style.display = "block";
      document.getElementById("notesPage").style.display = "none";
    }

    const notesArea = document.getElementById("notesArea");

    notesArea.value = localStorage.getItem("notes") || "";

    notesArea.addEventListener("input",()=>{
      localStorage.setItem("notes", notesArea.value);
    });

    renderTasks();
  </script>

</body>
</html>
