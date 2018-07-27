import { app, BrowserWindow, screen, Tray, Menu, globalShortcut, shell } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

let tray: Tray = null;

function createWindow() {

  const electronScreen = screen;
  const screenSize = electronScreen.getPrimaryDisplay().workAreaSize;

  const size = {
    width: 700,
    height: 70
  };

  // Create the browser window.
  win = new BrowserWindow({
    width: size.width,
    height: size.height,
    x: (screenSize.width / 2) - (size.width / 2),
    y: screenSize.height * 0.2,
    useContentSize: true,
    frame: false, // TODO deployda false olacak
    backgroundColor: '#80FFFFFF',
    opacity: 0.95,
    transparent: true, // TODO deployda true olacak
    hasShadow: true,
    skipTaskbar: true,
    minimizable: false,
    show: false
  });

  const iconPath = path.join(__dirname, 'src/assets/favicon-16x16.png');

  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Göster',
      click: (item, window, event) => {
        win.show();
      },
      accelerator: 'CommandOrControl+Alt+R'
    },
    {
      label: 'Yardım',
      click: (item, window, event) => {
        // console.log(item, event);
        shell.openExternal('http://bidb.idari.erdogan.edu.tr/tr/news-detail/universitemiz-antivirus-programi-yenilendi/666');

      },
      accelerator: 'CommandOrControl+Alt+Y'
    },
    {type: 'separator'},
    {
      label: 'Çıkış',
      click: (item, window, event) => {
        win.close();
      }
    },
  ]);
  tray.setToolTip('RTEÜ Telefon Rehberi Uygulaması');
  // tray.setTitle('RTEÜ Telefon Rehberi Uygulaması'); // macOS only
  tray.setContextMenu(contextMenu);
  tray.setHighlightMode('never');


  tray.on('right-click', () => {
    console.log('sağtık');
  });

  tray.on('click', () => {
    win.show();
    console.log('soltık');
    // ? Context Men kullanıldığında click event i görmezden geliniyor
  });

 /*  win.on('show', () => {
    console.log('göründü');
  }); */

  /* win.on('show', () => {
    tray.setHighlightMode('always');
  });

  win.on('hide', () => {
    tray.setHighlightMode('never');
  }); */

  if (serve) {
    require('electron-reload')(__dirname, {
     electron: require(`${__dirname}/node_modules/electron`)});
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  /* win.webContents.openDevTools(); */
  win.once('ready-to-show', () => {

  });

  win.on('blur', ev => {
    win.hide();
  });

  // Emitted when the window is closed.
  win.on('closed', ev => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  globalShortcut.register('CommandOrControl+Alt+R', () => {
    win.show();
  });
}

try {

  app.dock.hide();
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
