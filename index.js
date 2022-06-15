import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const holidays = [
	{ date: "1/1/2022", name: "Confraternização mundial" },
	{ date: "1/3/2022", name: "Carnaval" },
	{ date: "4/17/2022", name: "Páscoa" },
	{ date: "4/21/2022", name: "Tiradentes" },
	{ date: "5/1/2022", name: "Dia do trabalho" },
	{ date: "6/16/2022", name: "Corpus Christi" },
	{ date: "9/7/2022", name: "Independência do Brasil" },
	{ date: "10/12/2022", name: "Nossa Senhora Aparecida" },
	{ date: "11/2/2022", name: "Finados" },
	{ date: "11/15/2022", name: "Proclamação da República" },
	{ date: "12/25/2022", name: "Natal" }
];

app.get("/holidays", (_, res) => {
	res.send(holidays);
});

app.get("/is-today-holiday", (_, res) => {
	const hoje = new Date();
	//const hoje = new Date("6/16/2022");
	const day = hoje.getDate().toLocaleString();
	const month = hoje.getMonth().toLocaleString();
	let flag = false;
	let feriado = "";
	for(let i = 0; i < holidays.length; i++){
		let dia = new Date(holidays[i].date).getDate().toLocaleString();
		let mes = new Date(holidays[i].date).getMonth().toLocaleString();
		if(day === dia && month === mes){
			flag = true;
			feriado = holidays[i].name;
		}
	}
	if(flag) res.send(`Sim, hoje é ${feriado}`);
	else res.send("Não, hoje não é feriado");
});

app.get('/holidays/:mes', (req, res) => {
	const mes = parseInt(req.params.mes);
	let feriados_mes = [];
	for(let i = 0; i < holidays.length; i++){
		let month = new Date(holidays[i].date).getMonth().toLocaleString();
		if(mes-1 == month){
			feriados_mes.push(holidays[i]);
		}
	}
	res.send(feriados_mes);
});

app.listen(5000);