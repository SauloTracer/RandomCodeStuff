/*
	Script para ordenar lista "Assistir mais tarde" do Youtube pelo tamanho dos vídeos (time).
	Acesse https://www.youtube.com/playlist?list=WL, arraste a lista até o final até carregar todos os vídeos e execute o script abaixo.
	GitHub: https://github.com/SauloTracer

	Versão PT-BR, para outras linguas alterar valores das propriedades do objeto time, valores do replace para sanitizar o texto e valores da lista de unidades de tempo.
*/
const container = $("div#contents.ytd-playlist-video-list-renderer");
const videos = container.children;

let data = [];

function extractTimeFromString(value) {
	let time = {
		hora: 0,
		minuto: 0,
		segundo: 0,
	};

	value = value.replace(",", "").replace(" e", "");

	["hora", "minuto", "segundo"].map(unit => {
		if (value.includes(unit)) {
			value = value.replace(unit + "s", unit);
			time[unit] = parseInt(value.split(unit)[0]);
			value = value.split(unit)[1] ?? "";
		}
	});
	
	return (time.hora * 3600) + (time.minuto * 60) + time.segundo ?? 0;
}

function getLength(video) {
	let timeSpan = video.querySelector('span#text.style-scope.ytd-thumbnail-overlay-time-status-renderer');
	let timeText = timeSpan['ariaLabel'];
	return extractTimeFromString(timeText);
}

for (video of videos) {
	data.push({
		time: getLength(video),
		elemento: video
	});
}

sortedData = data.sort((a,b) => {
	return a.time - b.time
});

for (video of sortedData) {
	container.append(video.elemento);
}
