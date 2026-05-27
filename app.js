import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAI, getGenerativeModel, GoogleAIBackend, ResponseModality } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-ai.js";

// Firebase configuration from our initialized backend
const firebaseConfig = {
  apiKey: "AIzaSyCuOxwJcGkF55PJiTCf62iSB9aOvZZEU_k",
  authDomain: "ursophi.firebaseapp.com",
  projectId: "ursophi",
  storageBucket: "ursophi.firebasestorage.app",
  messagingSenderId: "1015219798297",
  appId: "1:1015219798297:web:6ba2df0a873153681b0588",
  measurementId: "G-VJS9VJCRLS"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase AI with Google AI Developer backend
const ai = getAI(app, { backend: new GoogleAIBackend() });

// Create model configurations using gemini-2.5-flash
const textModel = getGenerativeModel(ai, { model: "gemini-2.5-flash" });
const imageModel = getGenerativeModel(ai, {
  model: "gemini-2.5-flash-image",
  generationConfig: {
    responseModalities: [ResponseModality.TEXT, ResponseModality.IMAGE],
  }
});

// Bind functions to window so they are accessible from onclick inline handlers (prueba de git)
window.generateText = async function () {
  const promptInput = document.getElementById("text-prompt");
  const outputDiv = document.getElementById("text-output");
  const statusBadge = document.getElementById("text-status-badge");
  const outputPanel = document.getElementById("text-output-panel");
  const btn = document.getElementById("btn-generate-text");

  const prompt = promptInput.value.trim();
  if (!prompt) {
    alert("Por favor escribe una indicación antes de generar.");
    return;
  }

  // UI status update
  btn.disabled = true;
  statusBadge.textContent = "Generando...";
  outputPanel.classList.add("loading");
  outputDiv.innerHTML = "";

  try {
    // Generate streaming content for better premium feel
    const result = await textModel.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      outputDiv.innerHTML += chunkText;
    }

    statusBadge.textContent = "Completado";
  } catch (error) {
    console.error("Error generating text:", error);
    outputDiv.innerHTML = `<span style="color: #ef4444;">Error al generar el texto: ${error.message}</span>`;
    statusBadge.textContent = "Error";
  } finally {
    btn.disabled = false;
    outputPanel.classList.remove("loading");
  }
};

window.generateImage = async function () {
  const promptInput = document.getElementById("image-prompt");
  const placeholder = document.getElementById("image-placeholder");
  const resultImg = document.getElementById("result-img");
  const spinner = document.getElementById("image-spinner");
  const statusBadge = document.getElementById("image-status-badge");
  const outputPanel = document.getElementById("image-output-panel");
  const btn = document.getElementById("btn-generate-image");

  const prompt = promptInput.value.trim();
  if (!prompt) {
    alert("Por favor describe la imagen antes de generar.");
    return;
  }

  // UI status update
  btn.disabled = true;
  statusBadge.textContent = "Diseñando...";
  outputPanel.classList.add("loading");

  // Reset image displays
  resultImg.classList.remove("loaded");
  resultImg.style.display = "none";
  placeholder.style.display = "none";
  spinner.style.display = "block";

  try {
    const result = await imageModel.generateContent(prompt);
    const response = result.response;

    let imageGenerated = false;

    if (response.candidates?.[0].content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const mimeType = part.inlineData.mimeType;
          const base64Data = part.inlineData.data;

          resultImg.src = `data:${mimeType};base64,${base64Data}`;
          resultImg.style.display = "block";

          // Smooth fade in
          setTimeout(() => {
            resultImg.classList.add("loaded");
          }, 50);

          imageGenerated = true;
          break;
        }
      }
    }

    if (imageGenerated) {
      statusBadge.textContent = "Completado";
    } else {
      throw new Error("No se devolvió ninguna imagen en la respuesta.");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    placeholder.textContent = `Error al generar la imagen: ${error.message}`;
    placeholder.style.display = "block";
    placeholder.style.color = "#ef4444";
    statusBadge.textContent = "Error";
  } finally {
    spinner.style.display = "none";
    btn.disabled = false;
    outputPanel.classList.remove("loading");
  }
};
