# Minecraft Assets Server

This project extracts the `assets/` directory from a Minecraft `.jar` file and serves it over HTTP using [`http-server`](https://www.npmjs.com/package/http-server).  
It’s useful for previewing Minecraft resources like textures, models, and sounds directly in the browser.

## 🚀 Features

- Extracts the `assets/` folder from any Minecraft `.jar`
- Generates a JSON index of all model and texture file paths (`./assets/assets-index.json`)
- Serves the extracted files via a static HTTP server
- 🐳 Docker support

---

## 📦 Installation

```bash
git clone https://github.com/KimBlazter/minecraft-assets-server.git
cd minecraft-assets-server

pnpm install     # or: yarn install / npm install
```

## ⚙️ Usage

### 1. Extract assets from a `.jar` file

```bash
pnpm extract
```
This will extract the `assets/` folder into the `./assets/` directory.

### 2. (Optional) Generate the JSON index of models and textures

```bash
pnpm generate
```
This reads the extracted ./assets/ directory and creates assets-index.json listing all model and texture paths.

### 3. Serve the extracted assets

```bash
pnpm serve
```
>You can now access the assets from your browser at http://localhost:8000

## 🐳 Docker

### 1. Build the image

```bash
docker build -t minecraft-assets-server .
```

### 2. Run the container with a mounted `.jar` file

```bash
docker run -v ./{mc-version}.jar:/app/mc.jar minecraft-assets-server
```

This will:
- Extract assets to ./assets/
- (Optionally) generate assets-index.json if you run the generate step inside the container
- Serve assets at http://localhost:8000

## 📁 Folder structure (`1.21.5`)
```
└── 📁assets (root)
    └── 🗒️assets-index.json
    └── 📁minecraft
        └── 📁atlases
        └── 📁blockstates
        └── 📁equipment
        └── 📁font
        └── 📁items
        └── 📁lang
        └── 📁models
            └── 📁block
            └── 📁item
        └── 📁particles
        └── 📁post_effect
        └── 📁shaders
        └── 📁texts
        └── 📁textures
            └── 📁block
            └── 📁colormap
            └── 📁effect
            └── 📁entity
            └── 📁environment
            └── 📁font
            └── 📁gui
            └── 📁item
            └── 📁map
            └── 📁misc
            └── 📁mob_effect
            └── 📁painting
            └── 📁particle
            └── 📁trims
```

---

## 🎯 How to get a Minecraft `.jar` file (from your local installation)

If you already have Minecraft installed via the official launcher, you can extract the `.jar` file for any installed version directly from your system.

### 🧭 Step-by-step instructions

#### 🪟 Windows

1. Open the **Run** dialog (`Windows + R`) and type: `%appdata%.minecraft/versions`
2. Inside the `versions/` folder, choose the version you want (e.g. `1.21.5/`).
3. You’ll find a file like: `1.21.5.jar`
4. Copy that `.jar` file into your project directory and rename it if needed

#### 🍎 macOS

1. Open Finder and press `Cmd + Shift + G`, then enter: `~/Library/Application Support/minecraft/versions`
2. Locate your version folder (e.g. `1.21.5/`) and find a file like: `1.21.5.jar`
3. Copy that `.jar` file into your project directory and rename it if needed

#### 🐧 Linux

1. Navigate to: `~/.minecraft/versions/1.21.5/1.21.5.jar`
2. Copy the file into your project directory and rename it if needed