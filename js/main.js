document.addEventListener("DOMContentLoaded", () => {
    // 获取所有DOM元素
    const imageInput = document.getElementById("imageInput");
    const formatSelect = document.getElementById("formatSelect");
    const convertBtn = document.getElementById("convertBtn");
    const statusEl = document.getElementById("status");
    const previewArea = document.getElementById("previewArea");
    const originalPreview = document.getElementById("originalPreview");

    // --- JavaScript 修改点 1 ---
    // 获取 "转换后" 面板
    const convertedBox = document.getElementById("convertedBox");
    // --- JavaScript 修改结束 ---

    const convertedPreview = document.getElementById("convertedPreview");
    const downloadLink = document.getElementById("downloadLink");

    let originalFile = null;
    let originalFileName = "";

    // 1. 监听文件选择
    imageInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
            originalFile = e.target.files[0];
            originalFileName = originalFile.name.split('.').slice(0, -1).join('.');

            // --- JavaScript 修改点 2 ---
            // 重置状态时，确保 "转换后" 面板被隐藏
            statusEl.textContent = "";
            statusEl.className = "";
            downloadLink.style.display = "none";
            convertedPreview.src = "";
            convertedBox.style.display = "none"; // <-- 确保隐藏
            // --- JavaScript 修改结束 ---

            const reader = new FileReader();
            reader.onload = (event) => {
                originalPreview.src = event.target.result;
                previewArea.style.display = "flex"; // 显示预览区域（此时只包含原始图片）
            };
            reader.readAsDataURL(originalFile);
        } else {
            originalFile = null;
            previewArea.style.display = "none";
        }
    });

    // 2. 监听转换按钮点击
    convertBtn.addEventListener("click", () => {
        if (!originalFile) {
            statusEl.textContent = "请先选择一张图片！";
            statusEl.className = "error";
            return;
        }

        statusEl.textContent = "转换中，请稍候...";
        statusEl.className = "processing";
        convertBtn.disabled = true;

        // --- JavaScript 修改点 3 ---
        // 重置 "转换后" 面板，以防用户在同一张图上点两次转换
        convertedPreview.src = "";
        downloadLink.style.display = "none";
        convertedBox.style.display = "none";
        // --- JavaScript 修改结束 ---

        setTimeout(performConversion, 50);
    });

    function performConversion() {
        const targetFormat = formatSelect.value;
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            let targetWidth = img.width;
            let targetHeight = img.height;
            let mimeType = `image/${targetFormat}`;
            let fileExtension = targetFormat;

            if (targetFormat === "ico") {
                targetWidth = 32;
                targetHeight = 32;
                mimeType = "image/png";
                fileExtension = "ico";
            }

            if (targetFormat === "jpeg") {
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, targetWidth, targetHeight);
            }

            canvas.width = targetWidth;
            canvas.height = targetHeight;
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            let dataUrl;
            try {
                if (targetFormat === "jpeg") {
                    dataUrl = canvas.toDataURL(mimeType, 0.9);
                } else {
                    dataUrl = canvas.toDataURL(mimeType);
                }
            } catch (err) {
                statusEl.textContent = "转换失败。浏览器可能不支持此格式。";
                statusEl.className = "error";
                convertBtn.disabled = false;
                console.error("Canvas toDataURL error:", err);
                return;
            }

            // --- JavaScript 修改点 4 ---
            // 转换成功后，显示 "转换后" 面板和下载链接
            convertedPreview.src = dataUrl;
            convertedBox.style.display = "block"; // <-- 在此显示
            downloadLink.href = dataUrl;
            downloadLink.download = `${originalFileName}.${fileExtension}`;
            downloadLink.style.display = "block";
            // --- JavaScript 修改结束 ---

            statusEl.textContent = "转换完成！";
            statusEl.className = "success";
            convertBtn.disabled = false;
            URL.revokeObjectURL(img.src);
        };

        img.onerror = () => {
            statusEl.textContent = "无法加载图片。文件可能已损坏或格式不受支持。";
            statusEl.className = "error";
            convertBtn.disabled = false;
        };

        img.src = URL.createObjectURL(originalFile);
    }
});
