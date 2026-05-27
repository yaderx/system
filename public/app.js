fetch("http://localhost:3000/productos")

    .then(res => res.json())

    .then(data => {

       const btn = document.getElementById('profileBtn');
const menu = document.getElementById('profileDropdown');


btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('show');
});

document.addEventListener('click', () => {
    menu.classList.remove('show');
});

        const tabla = document.getElementById("tabla-productos");



        data.forEach(producto => {



            tabla.innerHTML += `

                <tr>

                    <td>${producto.nombre}</td>

                    <td>${producto.categoria}</td>

                    <td>$${producto.ventas}</td>

                    <td>${producto.stock}</td>

                    <td>${producto.estado}</td>

                </tr>

            `;



        });



    });







    fetch("http://localhost:3000/grafica")

    .then(res => res.json())

    .then(data => {



        const nombres = data.map(item => item.nombre);

        const ventas = data.map(item => item.ventas);



        const ctx = document

        .getElementById("graficaVentas")

        .getContext("2d");



        new Chart(ctx, {



            type: "line",



            data: {



                labels: nombres,



                datasets: [{



                    label: "Ventas",



                    data: ventas,



                    borderColor: "#f97316",



                    backgroundColor: (context) => {



                        const chart = context.chart;

                        const {ctx, chartArea} = chart;



                        if (!chartArea) {

                            return null;

                        }



                        const gradient = ctx.createLinearGradient(

                            0,

                            chartArea.top,

                            0,

                            chartArea.bottom

                        );



                        gradient.addColorStop(

                            0,

                            "rgba(249, 115, 22, 0.35)"

                        );



                        gradient.addColorStop(

                            1,

                            "rgba(249, 115, 22, 0)"

                        );



                        return gradient;



                    },



                    fill: true,



                    borderWidth: 4,



                    tension: 0.45,



                    pointRadius: 0,



                    pointHoverRadius: 7,



                    pointHoverBackgroundColor: "#f97316",



                    pointHoverBorderColor: "#fff",



                    pointHoverBorderWidth: 3



                }]



            },



            options: {



                responsive: true,



                maintainAspectRatio: false,



                interaction: {



                    intersect: false,

                    mode: "index"



                },



                plugins: {



                    legend: {



                        display: false



                    },



                    tooltip: {



                        backgroundColor: "#111827",



                        titleColor: "#fff",



                        bodyColor: "#fff",



                        padding: 12,



                        displayColors: false,



                        cornerRadius: 10



                    }



                },



                scales: {



                    x: {



                        grid: {



                            display: false



                        },



                        border: {



                            display: false



                        },



                        ticks: {



                            color: "#6b7280",



                            font: {

                                size: 13

                            }



                        }



                    },



                    y: {



                        beginAtZero: true,



                        grid: {



                            color: "rgba(0,0,0,0.05)"



                        },



                        border: {



                            display: false



                        },



                        ticks: {



                            color: "#6b7280",



                            font: {

                                size: 12

                            }



                        }



                    }



                }



            }



        });



    }); 

