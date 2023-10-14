let container;
let camera, scene, renderer;
let uniforms;
let loader = new THREE.TextureLoader();
let texture, rtTexture, rtTexture2;
loader.setCrossOrigin("anonymous");
loader.load(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png",
  function do_something_with_texture(tex) {
    texture = tex;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(0.5, 0.5);
    texture.minFilter = THREE.LinearFilter;
    init();
    animate();
  }
);
//  se logger sur le site
const formLogin = document.querySelector('.form-login');

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
   artSphereApi.users.login(email, password).then(function(){
      const loginImg = document.querySelector('#register img');
        loginImg.setAttribute('src', `asset/img/logout.svg`);
        var form = document.querySelector('#loginForm');
        form.classList.add('hidden'); ;
    formLogin.reset();
   })   
});
//s enregistrer sur le site
document.getElementById('register').addEventListener('click', function(event) {
  event.preventDefault(); 
  if(window.sessionStorage.getItem('user')){
    window.sessionStorage.removeItem('user')
    const registerImg = document.querySelector('#register img');
    registerImg.setAttribute('src', `asset/img/profile.svg`);
  } 
  else {
      var form = document.getElementById('registrationForm');
      if (form.classList.contains('hidden')) {
          form.classList.remove('hidden'); 
      } else {
          form.classList.add('hidden');    
      }
  };
});

document.getElementById('createAccount').addEventListener('click', function(event) {
  event.preventDefault();
  var form = document.getElementById('detailedRegistrationForm');
  form.classList.remove('hidden');
});

document.querySelector('.close').addEventListener('click', function() {
  var form = document.getElementById('registrationForm');
  form.classList.add('hidden');
});

document.querySelector('.closeDetailed').addEventListener('click', function() {
  var form = document.getElementById('detailedRegistrationForm');
  form.classList.add('hidden');
});

document.querySelector('#detailedRegistrationForm form').addEventListener('submit', function(event) {
  const email = document.querySelector('#register-email').value;
  const password = document.querySelector('#register-password').value;
  const confirmPassword = document.querySelector('#register-confirmPassword').value;
  
  if (password !== confirmPassword) {
      alert("Password doesn't match!");
      event.preventDefault();
  }
  else{
    artSphereApi.users.register(email, password).then(function(){
      const registerImg = document.querySelector('#register img');
        registerImg.setAttribute('src', `asset/img/logout.svg`);
        var form = document.querySelector('#registrationForm');
        form.classList.add('hidden'); 
     });
  } 
});

function init() {
  container = document.getElementById("container");

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  let geometry = new THREE.PlaneBufferGeometry(2, 2);

  rtTexture = new THREE.WebGLRenderTarget(
    window.innerWidth * 0.1,
    window.innerHeight * 0.1
  );
  rtTexture2 = new THREE.WebGLRenderTarget(
    window.innerWidth * 0.1,
    window.innerHeight * 0.1
  );

  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_noise: { type: "t", value: texture },
    u_buffer: { type: "t", value: rtTexture.texture },
    u_mouse: { type: "v2", value: new THREE.Vector2() },
    u_renderpass: { type: "b", value: false },
  };

  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
  });

  material.extensions.derivatives = true;

  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  onWindowResize();
  window.addEventListener("resize", onWindowResize, false);

  document.addEventListener("pointermove", (e) => {
    let ratio = window.innerHeight / window.innerWidth;
    uniforms.u_mouse.value.x =
      (e.clientX - window.innerWidth / 2) / window.innerWidth / ratio;
    uniforms.u_mouse.value.y =
      ((e.clientY - window.innerHeight / 2) / window.innerHeight) * -1;

    e.preventDefault();
});
}
function onWindowResize(event) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;

  rtTexture = new THREE.WebGLRenderTarget(
    window.innerWidth * 0.2,
    window.innerHeight * 0.2
  );
  rtTexture2 = new THREE.WebGLRenderTarget(
    window.innerWidth * 0.2,
    window.innerHeight * 0.2
  );
}

function animate(delta) {
  requestAnimationFrame(animate);
  render(delta);
}

// let capturer = new Capturer({
//   verbose: true,
//   framerate: 60,
//   quality: 90,
//   format: "webm",
//   workersPath: "js/",
// });

let capturing = false;

function isCapturing(val) {
  if (val === false && window.capturing === true) {
    capturer.stop();
    capturer.save();
  } else if (val === true && window.capturing === false) {
    capturer.start();
  }
  capturing = val;
}
function toggleCapture() {
  isCapturing(!capturing);
}

window.addEventListener("keyup", function (e) {
  if (e.key == "d") toggleCapture();
});

let then = 0;
function renderTexture(delta) {
  let odims = uniforms.u_resolution.value.clone();
  uniforms.u_resolution.value.x = window.innerWidth * 0.2;
  uniforms.u_resolution.value.y = window.innerHeight * 0.2;
  uniforms.u_buffer.value = rtTexture2.texture;
  uniforms.u_renderpass.value = true;
  window.rtTexture = rtTexture;
  renderer.setRenderTarget(rtTexture);
  renderer.render(scene, camera, rtTexture, true);
  let buffer = rtTexture;
  rtTexture = rtTexture2;
  rtTexture2 = buffer;
  uniforms.u_buffer.value = rtTexture.texture;
  uniforms.u_resolution.value = odims;
  uniforms.u_renderpass.value = false;
}
function render(delta) {
  uniforms.u_time.value = delta * 0.0005;
  renderer.render(scene, camera);
  renderTexture();

  // if (capturing) {
  //   capturer.capture(renderer.domElement);
  // }
}
let cursor = document.getElementById('cursor');


