import React from 'react';

class Weather extends React.Component {
	state = { data: null };

	getWeather = async () => {
		const { lat, lng } = this.props;

		const API_KEY = 'dd80ec8b34e44a0995677deab7ea6152';
		const PROXY_URL = 'http://localhost:8080/';
		const WEATHER_API = 'https://api.weatherbit.io/v2.0/current';

		const url = `${WEATHER_API}?lang=pl&units=M&lat=${lat}&lon=${lng}&key=${API_KEY}`;

		const resp = await fetch(PROXY_URL + url);

		if (!resp.ok) {
			throw new Error(`HTTP error: ${resp.status}`);
		}

		const json = await resp.json();
		const [weather = null] = json.data || [];
		return weather;
	};

	async componentDidMount() {
		try {
			const weather = await this.getWeather();
			this.setState({ data: weather });
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		const { data } = this.state;

		if (!data) return null;

		return (
			<h1>
				Pogoda dla {data.city_name}: {data.temp}°C, {data.weather.description}
			</h1>
		);
	}
}

export { Weather };
