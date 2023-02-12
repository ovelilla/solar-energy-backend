import axios from "axios";

export const getPvgis = async (req, res) => {
    const {
        lat,
        lon,
        raddatabase,
        pvtechchoice,
        peakpower,
        loss,
        mountingplace,
        angle,
        aspect,
        outputformat,
    } = req.body;

    const urlBase = "https://re.jrc.ec.europa.eu/api/v5_2/PVcalc";

    const aspectValues = { Sur: 0, Este: -90, Oeste: 90 };

    const params = {
        lat,
        lon,
        raddatabase,
        pvtechchoice,
        peakpower,
        loss,
        mountingplace,
        angle,
        aspect: aspectValues[aspect],
        outputformat,
    };

    try {
        const response = await axios.get(urlBase, { params });

        const data = {
            response: response.data,
            monthly: response.data.outputs.monthly.fixed,
            totals: response.data.outputs.totals.fixed,
        };

        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
