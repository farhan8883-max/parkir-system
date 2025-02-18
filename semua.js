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
            alert('Nomor polisi harus diisi!');
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
            Nomor Polisi: ${ticket.plateNumber}<br>
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

    updateRekap();
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
// ///