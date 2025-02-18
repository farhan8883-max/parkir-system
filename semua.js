$(document).ready(function () {
    let parkingRecords = JSON.parse(localStorage.getItem('parkingRecords')) || [];

    function saveToLocalStorage() {
        localStorage.setItem('parkingRecords', JSON.stringify(parkingRecords));
    }

    function generateParkingCode() {
        return Math.random().toString(36).substr(2, 8).toUpperCase();
    }

    function isVehicleAlreadyParked(plateNumber) {
        return parkingRecords.some(ticket => 
            ticket.plateNumber === plateNumber && !ticket.exitTime
        );
    }

    $('#btnEntry').click(function () {
        const vehicleType = $('#vehicleType').val();
        const plateNumber = $('#plateNumber').val().trim();

        if (!plateNumber) {
            alert('Nomor plat harus diisi!');
            return;
        }

        if (isVehicleAlreadyParked(plateNumber)) {
            alert('Kendaraan ini sudah terdaftar dan belum keluar!');
            return;
        }

        const entryTime = new Date();
        const parkingCode = generateParkingCode();
        
        const ticket = {
            vehicleType,
            plateNumber,
            parkingCode,
            entryTime: entryTime.toISOString(),
            exitTime: null,
            cost: 0
        };

        parkingRecords.push(ticket);
        saveToLocalStorage();
        alert(`Masuk: ${plateNumber}\nKode Parkir: ${parkingCode}`);
        updateTicket(ticket);
    });

    $('#btnExit').click(function () {
        const parkingCode = $('#parkingCode').val().trim();

        const ticket = parkingRecords.find(t => t.parkingCode === parkingCode && !t.exitTime);

        if (!ticket) {
            alert('Kode Parkir tidak ditemukan atau kendaraan sudah keluar!');
            return;
        }

        const exitTime = new Date();
        ticket.exitTime = exitTime.toISOString();
        
        const duration = (exitTime - new Date(ticket.entryTime)) / (1000 * 60 * 60);
        const rate = ticket.vehicleType === 'motor' ? 3000 : 5000;
        ticket.cost = rate * Math.ceil(duration);

        saveToLocalStorage();
        alert(`Kendaraan keluar. Biaya: Rp ${ticket.cost.toFixed(2)}`);
        updateRekap();
    });

    function updateTicket(ticket) {
        $('#ticketInfo').html(`
            Jenis Kendaraan: ${ticket.vehicleType}<br>
            Nomor Plat: ${ticket.plateNumber}<br>
            Kode Parkir: ${ticket.parkingCode}<br>
            Jam Masuk: ${new Date(ticket.entryTime).toLocaleString()}
        `);
        $('#ticket').show();
    }

    function updateRekap() {
        $('#rekapList').empty();
        parkingRecords.forEach(ticket => {
            if (ticket.exitTime) {
                $('#rekapList').append(`
                    <li>
                        ${ticket.vehicleType} - ${ticket.plateNumber}<br>
                        Masuk: ${new Date(ticket.entryTime).toLocaleString()}<br>
                        Keluar: ${new Date(ticket.exitTime).toLocaleString()}<br>
                        Biaya: Rp ${ticket.cost.toFixed(2)}
                    </li>
                `);
            }
        });
    }
    
    // Fungsi untuk menghapus semua data rekap
    function clearRekap() {
        parkingRecords = []; // Mengosongkan array data
        updateRekap(); // Memperbarui tampilan
    }
    
    $(document).ready(function() {
        updateRekap(); // Menjalankan update pertama kali
        
        // Menambahkan tombol Clear All
        $('#rekapContainer').append('<button id="clearRekapBtn">Clear All</button>');
        
        // Event listener untuk tombol Clear All
        $('#clearRekapBtn').on('click', function() {
            clearRekap();
        });
    });
    
});
// list parkir //
$(document).ready(function () {
    function loadParkingList() {
        let parkingRecords = JSON.parse(localStorage.getItem('parkingRecords')) || [];
        $('#parkirList').empty();
        
        let activeParkings = parkingRecords.filter(ticket => !ticket.exitTime);
        
        if (activeParkings.length === 0) {
            $('#parkirList').append('<li>Tidak ada kendaraan yang sedang parkir</li>');
        } else {
            activeParkings.forEach(ticket => {
                $('#parkirList').append(`
                    <li>
                        <strong>${ticket.vehicleType.toUpperCase()}</strong> - ${ticket.plateNumber}<br>
                        <small>Masuk: ${new Date(ticket.entryTime).toLocaleString()}</small><br>
                        <small>Kode Parkir: ${ticket.parkingCode}</small>
                    </li>
                `);
            });
        }
    }
    
    $('#btnDeleteAll').click(function () {
        if (confirm("Apakah Anda yakin ingin menghapus semua data parkir?")) {
            localStorage.removeItem('parkingRecords');
            loadParkingList();
        }
    });
    
    loadParkingList();
});

// modals //
$(document).ready(function(){
    $("#openModal").click(function(){
        $("#myModal").fadeIn();
    });
    $(".close, .modal").click(function(event){
        if(event.target == this) {
            $("#myModal").fadeOut();
        }
    });
});
$(document).ready(function(){
    $("#opensModal").click(function(){
        $("#myModals").fadeIn();
    });
    $(".close, .modals").click(function(event){
        if(event.target == this) {
            $("#myModals").fadeOut();
        }
    });
});
$(document).ready(function(){
    $("#opensaja").click(function(){
        $("#myModalss").fadeIn();
    });
    $(".close, .modalss").click(function(event){
        if(event.target == this) {
            $("#myModalss").fadeOut();
        }
    });
});
$(document).ready(function(){
    $("#opensajas").click(function(){
        $("#myMod").fadeIn();
    });
    $(".close, .mod").click(function(event){
        if(event.target == this) {
            $("#myMod").fadeOut();
        }
    });
});
// screenshot //
$(document).ready(function() {
    $('#screenshot-btn').click(function() {
        html2canvas(document.body).then(function(canvas) {
            var link = document.createElement('a');
            link.download = 'karcis.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });
});
// tooltip //
$(document).ready(function() {
    $('#btnEntry').hover(function(event) {
        // Tampilkan tooltip
        $('#tooltips').css({
            top: event.pageY + 10,
            left: event.pageX + 10
        }).fadeIn(200);
    }, function() {
        // Sembunyikan tooltip
        $('#tooltips').fadeOut(200);
    });
});
$(document).ready(function() {
    $('#btnExit').hover(function(event) {
        // Tampilkan tooltip
        $('#tooltipss').css({
            top: event.pageY + 10,
            left: event.pageX + 10
        }).fadeIn(200);
    }, function() {
        // Sembunyikan tooltip
        $('#tooltipss').fadeOut(200);
    });
});
$(document).ready(function() {
    $('#opensajas').hover(function(event) {
        // Tampilkan tooltip
        $('#tooltipsss').css({
            top: event.pageY + 10,
            left: event.pageX + 10
        }).fadeIn(200);
    }, function() {
        // Sembunyikan tooltip
        $('#tooltipsss').fadeOut(200);
    });
});
$(document).ready(function() {
    $('#openModal').hover(function(event) {
        // Tampilkan tooltip
        $('#tooltipss2').css({
            top: event.pageY + 10,
            left: event.pageX + 10
        }).fadeIn(200);
    }, function() {
        // Sembunyikan tooltip
        $('#tooltipss2').fadeOut(200);
    });
});
$(document).ready(function() {
    $('#opensModal').hover(function(event) {
        // Tampilkan tooltip
        $('#tooltipss3').css({
            top: event.pageY + 10,
            left: event.pageX + 10
        }).fadeIn(200);
    }, function() {
        // Sembunyikan tooltip
        $('#tooltipss3').fadeOut(200);
    });
});
// ///