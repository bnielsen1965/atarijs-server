
const MAX_DRIVES = 4;
const STATUS_REFRESH_MS = 5000;

window.onload = ready;

let statusTimer;
let driveCount = 0;
let busy = false;

// document is loaded and ready
async function ready () {
  await getImageList();
  appendDrive();
  await getStatus();
  document.getElementById('append-drive').addEventListener('click', appendDrive);
  document.getElementById('refresh-images').addEventListener('click', getImageList);
}




async function getStatus () {
  clearTimeout(statusTimer);
  if (busy) {
    statusTimer = setTimeout(getStatus, STATUS_REFRESH_MS);
    return;
  }
  busy = true;
  let data;
  try {
    data = await API.getJSON('/api/getstatus');
  }
  catch (error) {
    busy = false;
    appendError(error.message);
    statusTimer = setTimeout(getStatus, STATUS_REFRESH_MS);
    return;
  }
  showStatus(data);
  busy = false;
  statusTimer = setTimeout(getStatus, STATUS_REFRESH_MS);
}

// show status from status response
function showStatus (res) {
  let activeDrives = res.status.drives.reduce((f, d, i) => (d.filename && d.filename.length ? i + 1 : f), 0);
  // ensure there are enough controls to cover active drives
  let rows = document.querySelector('#drive-controls').querySelectorAll('.box-row');
  let n = activeDrives - rows.length;
  while (n-- > 0) appendDrive();
  rows = document.querySelector('#drive-controls').querySelectorAll('.box-row');
  // show status of each drive
  res.status.drives.forEach((dstatus, i) => {
    if (i < rows.length) showDriveStatus(rows[i], dstatus);
  });
}

// load the drive status in the specified drive number row
function showDriveStatus (driveRow, status) {
  driveRow.querySelector('.sector-size').innerHTML = `Sector Size: ${status.sectorSize || ''}`;
  driveRow.querySelector('.sector-count').innerHTML = `Sector Count: ${status.sectorCount || ''}`;
  driveRow.querySelector('.status').innerHTML = `Status: ${status.readOnly ? 'RO' : (status.readOnly === false ? 'RW' : '')}`;
  driveRow.querySelector('.filename').value = status.filename || '';
}



async function getImageList () {
  if (busy) return;
  busy = true;
  removeDragListeners();
  document.querySelector('#drive-images').innerHTML = '';
  let data;
  try {
    data = await API.getJSON('/api/getimagelist');
  }
  catch (error) {
    busy = false;
    console.error('There has been a problem with your fetch operation:', error);
    return;
  }
  showImageList(data);
  busy = false;
}

function showImageList (list) {
  let listElem = document.querySelector('#drive-images');
  list.imageFiles.forEach(file => {
    listElem.insertAdjacentHTML('beforeend', `<div class="image-file drag" draggable="true">${file}</div>`);
  });
  addDragListeners();
}




// append a new drive container
function appendDrive () {
  driveCount += 1;
  document.getElementById('drive-controls').insertAdjacentHTML('beforeend', htmlDrive(driveCount));
  removeDropListeners();
  addDropListeners();
}

function htmlDrive (i) {
  return `
  <div class="box-row" id="drive_${i}">
  <label class="drive_info">D${i} <input class="drop filename" type="text" name="drive_image_${i}"></label>
  <div class="drive_info">
    <span class="drive_info sector-size">Sector Size: </span><span class="drive_info sector-count">Sector Count: </span><br>
    <span class="drive_info status">Status: </span>
    <span class="drive_controls">
      <span class="material_icons" title="Save Disk" onclick="saveDrive(${i})">save</span>
      <span class="material_icons" title="Eject Disk" onclick="ejectDrive(${i})">eject</span>
    </span>
  </div>
  </div>
  `;
}

async function saveDrive (driveNumber) {
  let response = await API.postJSON('/api/savedriveimage', { driveNumber });
  responseToLog(response);
  showStatus(response);
}

async function ejectDrive (driveNumber) {
  let response = await API.postJSON('/api/ejectdriveimage', { driveNumber });
  responseToLog(response);
  showStatus(response);
}


function addDragListeners () {
  const drags = document.querySelectorAll('.drag');
  drags.forEach(elem => elem.addEventListener('dragstart', drag));
}

function removeDragListeners () {
  const drags = document.querySelectorAll('.drag');
  drags.forEach(elem => elem.removeEventListener('dragstart', drag));
}

// add listeners to drop targets
function addDropListeners () {
  const drops = document.querySelectorAll('.drop');
  drops.forEach(drop => {
    drop.addEventListener('drop', dropHere, false);
    drop.addEventListener('dragenter', dragEnter, false);
    drop.addEventListener('dragover', dragOver, false);
    drop.addEventListener('dragleave', dragLeave, false);
  });
}

// remove event listeners from drop targets
function removeDropListeners () {
  const drops = document.querySelectorAll('.drop');
  drops.forEach(drop => {
    drop.removeEventListener('drop', dropHere);
    drop.removeEventListener('dragenter', dragEnter);
    drop.removeEventListener('dragover', dragOver);
    drop.removeEventListener('dragleave', dragLeave);
  });
}

function dragEnter (e) {
  e.preventDefault();
}

function dragOver (e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
  return false;
}

function dragLeave (e) {

}

// drag image file
function drag (e) {
  e.dataTransfer.setData('text/plain', e.target.textContent);
  e.dataTransfer.effectAllowed = 'copy';
  console.log(e.target.id)
}

// drop image on drive
async function dropHere (e) {
  e.preventDefault();
  e.stopPropagation();
  let imageFilename = e.dataTransfer.getData('text/plain');
  e.target.value = imageFilename;
  e.target.value = e.dataTransfer.getData('text/plain');
  let row;
  let ce = e.target;
  while (ce.parentNode) {
    if (ce.classList.contains('box-row')) break;
    ce = ce.parentNode;
  }
  let driveNumber = parseInt(ce.id.split('_')[1]);
  let response = await API.postJSON('/api/loadimage', { imageFilename, driveNumber });
  responseToLog(response);
  showStatus(response);
  return false;
}


function responseToLog (res) {
  res.errors && res.errors.forEach(error => appendError(error));
  res.messages && res.messages.forEach(msg => appendMessage(msg));
}

function appendMessage (msg) {
  appendLog(`<div class="log-line log-message">${msg}</div>`);
}

function appendError (msg) {
  appendLog(`<div class="log-line log-error">${msg}</div>`);
}

function appendLog (line) {
  let log = document.querySelector('#log');
  let msgs = log.querySelectorAll('.log-line');
  log.insertAdjacentHTML('beforeend', line);
  if (msgs.length > 3) log.removeChild(msgs[0]);
}
