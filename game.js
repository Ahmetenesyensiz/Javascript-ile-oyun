//oyunun başındaki bilgilendirme için butonları ayarladım.
var tamamButton = document.getElementById("tamam");
var bilgilendirme = document.getElementById("bilgilendirme");

//butona basıldığında bilgilendirmeyi kapatması için
tamamButton.addEventListener("click", function() {
  bilgilendirme.style.display = "none";
});

//canvayı oluşturdum
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
ctx.lineWidth = 5;
var borderSize = parseInt(canvas.style.borderWidth);

//kareyi çizme fonksiyonu
function drawSquare(x,y,size,color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x,y,size,size);
}

//kırmızı topu çizme fonksiyonu
function drawBall()
{
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

//yeşil topu çizme fonksiyonu
function drawGreenBall() {
  // Yeşil topu çiz
  ctx.beginPath();
  ctx.arc(greenBallX, greenBallY, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}


//kırmızı topun hareket etmesini sağlayacak fonksiyon
function moveBall() {
  // Topu hareket ettir
  ballX += dx;
  ballY += dy;

  // Duvarlara çarpma kontrolü yapan if-else bloğu
  if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
    dx = -dx;
  }
  if (ballY + dy > canvas.height - ballRadius || ballY + dy < ballRadius) {
    dy = -dy;
  }

  if (Math.abs(greenBallX - ballX) <= ballRadius + ballRadius && Math.abs(greenBallY - ballY) <= ballRadius + ballRadius) {
    // Yeşil topu silmek amacıyla canvasın dışına gönderdim
    greenBallX = -10;
    greenBallY = -10;
  }

  if (Math.abs(squareX - ballX) <= ballRadius + ballRadius && Math.abs(squareY - ballY) <= ballRadius + ballRadius) {
    // Kareyi silmek amacıyla canvasın dışına gönderdim
    squareX = -600;
    squareY = -600;

    // Top önce yeşil topa değdi mi? onu kontrol ederek oyunun bitmesini sağlıyorum
    if (greenBallX > ballX) {
      // Hayır, oyun kaybedildi
      alert("Kaybettiniz!");
      location.reload();
    } else {
      // Evet, oyun kazanıldı
      alert("Tebrikler, kazandınız!");
      location.reload();
    }
  }
}

  
//karenin ölçülerini ayarlıyorum ve rastgele yer oluşturarak kırmızı topa değmemesini sağlıyorum
var squareSize = 50;
var squareColor = "#0000FF";

var squareX = Math.floor(Math.random() * (canvas.width - borderSize - squareSize)) + borderSize;
var squareY = Math.floor(Math.random() * (canvas.height - borderSize - squareSize)) + borderSize;

if (Math.abs(squareX - ballX) <= ballRadius + squareSize && Math.abs(squareY - ballY) <= ballRadius + squareSize) {
    // Kare ve yuvarlak birbirine denk geliyor
    if (squareX < canvas.width / 2) {
      // Kare yuvarlağın solunda
      squareX -= squareSize;
    } else {
      // Kare yuvarlağın sağınday
      squareX += squareSize;
    }
    if (squareY < canvas.height / 2) {
      // Kare yuvarlağın üstünde
      squareY -= squareSize;
    } else {
      // Kare yuvarlağın altında
      squareY += squareSize;
    }
  }


//aşağıdaki 3 listener mouse'un hareketine göre işleyişleri ayarlıyor
canvas.addEventListener("mousemove", function(event) {
    if (isDragging) {
        var mouseX = event.clientX - canvas.offsetLeft;
        var mouseY = event.clientY - canvas.offsetTop;
    }
});
canvas.addEventListener("mousedown", function(event) {
    // Topun hareketini durdurmak amacıyla
    dx = 0;
    dy = 0;
    
    // Mouse konumunu alır
    startMouseX = event.clientX - canvas.offsetLeft;
    startMouseY = event.clientY - canvas.offsetTop;
    
    // Mouse hareketlerini dinlemeye başla
    isDragging = true;
});

canvas.addEventListener("mouseup", function(event) {
    // Topun hareketini başlat
    dx = (event.clientX - canvas.offsetLeft - startMouseX) / 10;
    dy = (event.clientY - canvas.offsetTop - startMouseY) / 10;
    
    isDragging = false;
});

//kırmızı topun değerlerini ayarlıyorum
var ballRadius = 10;
var ballX = canvas.width/2;
var ballY = canvas.height/2;
var dx = 0;
var dy = 0;


//yeşil topun değerlerini ayarlıyorum ve konumunun hem kırmızı top hem de kare ile kesişmemesi için gerekli döngüyü yazıyorum
var greenBallX, greenBallY;
var dx = 0;
var dy = 0;
  do {
    greenBallX = Math.floor(Math.random() * (canvas.width - borderSize - ballRadius*2)) + borderSize + ballRadius;
    greenBallY = Math.floor(Math.random() * (canvas.height - borderSize - ballRadius*2)) + borderSize + ballRadius;
  } while (Math.abs(greenBallX - ballX) <= ballRadius + ballRadius && Math.abs(greenBallY - ballY) <= ballRadius + ballRadius);


var isDragging = false;
var startMouseX = 0;
var startMouseY = 0;

//draw fonksiyonu ile oyundaki cisimleri çizerek oyunu başlatıyorum.
function draw() {
  // Canvas'ı temizle
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Kareyi çiz
  drawSquare(squareX, squareY, squareSize, squareColor);

  drawGreenBall();

  // Topu çiz
  drawBall();

  // Topu hareket ettir
  moveBall();

  
  requestAnimationFrame(draw);
}

draw();

