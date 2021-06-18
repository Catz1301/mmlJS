/* // canvas
function analyzeCanvas() {
	if (player.ready()) {
		const analyser = player.audioContext.createAnalyser()
		player._gain.disconnect();
		player._gain.connect(analyser);
		analyser.connect(player.audioContext.destination);

		const waveform = new Float32Array(analyser.frequencyBinCount)
		analyser.getFloatTimeDomainData(waveform);
		(function updateWaveform() {
			requestAnimationFrame(updateWaveform)
			analyser.getFloatTimeDomainData(waveform)
		})();
		const scopeCanvas = document.getElementById('oscilliscope')
		scopeCanvas.width = waveform.length
		scopeCanvas.height = 200
		const scopeContext = scopeCanvas.getContext('2d');

		(function drawOscilloscope() {
			requestAnimationFrame(drawOscilloscope)
			scopeContext.clearRect(0, 0, scopeCanvas.width, scopeCanvas.height)
			scopeContext.beginPath()
			for (let i = 0; i < waveform.length; i++) {
				const x = i
				const y = (0.5 + waveform[i] / 2) * scopeCanvas.height;
				if (i == 0) {
					scopeContext.moveTo(x, y)
				} else {
					scopeContext.lineTo(x, y)
				}
			}
			scopeContext.stroke()
		})();
	}
} */


// canvas
function analyzeCanvas() {
	if (player.ready()) {
		var waves = [];
		var analysers = [];
		for (let i = 0; i < player._gains.length; i++) {
			let analyser = player.audioContext.createAnalyser();
			console.log(player._gains[i]);
			player._gains[i].disconnect();
			player._gains[i].connect(analyser);
			analyser.connect(player.audioContext.destination);
			let waveform = new Float32Array(analyser.frequencyBinCount)
			analyser.getFloatTimeDomainData(waveform);
			waves.push(waveform);
			analysers.push(analyser);
		}
		/* const analyser = player.audioContext.createAnalyser()
		player._gain.disconnect();
		player._gain.connect(analyser);
		analyser.connect(player.audioContext.destination); */


		(function updateWaveform() {
			requestAnimationFrame(updateWaveform)
			for (let i = 0; i < analysers.length; i++)
				analysers[i].getFloatTimeDomainData(waves[i])
		})();
		const scopeCanvas = document.getElementById('oscilliscope');
		scopeCanvas.width = waves[0].length;
		scopeCanvas.height = 200;
		const scopeContext = scopeCanvas.getContext('2d');

		(function drawOscilloscope() {
			requestAnimationFrame(drawOscilloscope)
			scopeContext.clearRect(0, 0, scopeCanvas.width, scopeCanvas.height)
			scopeContext.beginPath();
			for (let w = 0; w < waves.length; w++) {
				let wave = waves[w];
				for (let i = 0; i < wave.length; i++) {
					const x = i
					const y = (0.5 + wave[i] / 2) * scopeCanvas.height;
					if (i == 0) {
						scopeContext.moveTo(x, y)
					} else {
						scopeContext.lineTo(x, y)
					}
				}
				scopeContext.strokeStyle = getRandomColor();
				scopeContext.stroke();
			}
			// scopeContext.stroke()
		})();
	}
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
	let r = getRandomInt(0, 255);
	let g = getRandomInt(0, 255);
	let b = getRandomInt(0, 255);
	let rgb = rgbToHex(r, g, b);
	return rgb;
}

function rgbToHex(r, g, b) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/* ------------------------------------------ */

function initQuad(gl) {
	const vbo = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
	const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
	gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
}

function renderQuad(gl) {
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

function createShader(gl, vertexShaderSrc, fragmentShaderSrc) {
	const vertexShader = gl.createShader(gl.VERTEX_SHADER)
	gl.shaderSource(vertexShader, vertexShaderSrc)
	gl.compileShader(vertexShader)
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		throw new Error(gl.getShaderInfoLog(vertexShader))
	}

	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
	gl.shaderSource(fragmentShader, fragmentShaderSrc)
	gl.compileShader(fragmentShader)
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		throw new Error(gl.getShaderInfoLog(fragmentShader))
	}

	const shader = gl.createProgram()
	gl.attachShader(shader, vertexShader)
	gl.attachShader(shader, fragmentShader)
	gl.linkProgram(shader)
	gl.useProgram(shader)

	return shader
}

function createTexture(gl) {
	const texture = gl.createTexture()
	gl.bindTexture(gl.TEXTURE_2D, texture)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
	return texture
}

function copyAudioDataToTexture(gl, audioData, textureArray) {
	for (let i = 0; i < audioData.length; i++) {
		textureArray[4 * i + 0] = audioData[i] // R
		textureArray[4 * i + 1] = audioData[i] // G
		textureArray[4 * i + 2] = audioData[i] // B
		textureArray[4 * i + 3] = 255 // A
	}
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, audioData.length, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, textureArray)
}

var fragCanvas, gl, vertexShaderSrc, fragmentShaderSrc, fragShader;
var fragPosition, fragTime, fragResolution, fragSpectrumArray, fragSpectrum;

function setupFancyStuff() {
	if (player.ready()) {
		fragCanvas = document.getElementById('fragment')
		fragCanvas.width = fragCanvas.parentNode.offsetWidth
		fragCanvas.height = fragCanvas.width * 0.75
		gl = fragCanvas.getContext('webgl') || fragCanvas.getContext('experimental-webgl')
		vertexShaderSrc = document.getElementById('vertex-shader').textContent
		fragmentShaderSrc = document.getElementById('fragment-shader').textContent
		fragShader = createShader(gl, vertexShaderSrc, fragmentShaderSrc);

		fragPosition = gl.getAttribLocation(fragShader, 'position')
		gl.enableVertexAttribArray(fragPosition)
		fragTime = gl.getUniformLocation(fragShader, 'time')
		gl.uniform1f(fragTime, player.audioContext.currentTime)
		fragResolution = gl.getUniformLocation(fragShader, 'resolution')
		gl.uniform2f(fragResolution, fragCanvas.width, fragCanvas.height)
		fragSpectrum = createTexture(gl)
		fragSpectrumArray = new Uint8Array(4 * fragSpectrum.length)
	}
}

function doFancyStuff() {
	setupFancyStuff();
	initQuad(gl);

	(function renderFragment() {
		requestAnimationFrame(renderFragment)
		gl.uniform1f(fragTime, player.audioContext.currentTime)
		copyAudioDataToTexture(gl, fragSpectrum, fragSpectrumArray)
		renderQuad(gl)
	})();
}