import axios from "axios";

export const getPlace = async (req, res) => {
    const { id } = req.params;

    const urlBase = "https://maps.googleapis.com/maps/api/place/details/json";

    const params = {
        place_id: id,
        key: process.env.GOOGLE_MAPS_API_KEY,
    };

    console.log(params);

    try {
        const response = await axios.get(urlBase, { params });

        console.log(response.data);
        if (response.data.status !== "OK") {
            throw new Error("Error fetching place");
        }

        const data = {
            response: response.data,
            placeId: response.data.result.place_id,
            formattedAddress: response.data.result.formatted_address,
            latitude: response.data.result.geometry.location.lat,
            longitude: response.data.result.geometry.location.lng,
            components: {},
        };

        const addressComponents = response.data.result.address_components;

        for (const component of addressComponents) {
            if (component.types.includes("route")) {
                data.components.street = component.long_name;
            }
            if (component.types.includes("street_number")) {
                data.components.number = component.long_name;
            }
            if (component.types.includes("locality")) {
                data.components.location = component.long_name;
            }
            if (component.types.includes("administrative_area_level_2")) {
                data.components.city = component.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
                data.components.community = component.long_name;
            }
            if (component.types.includes("country")) {
                data.components.country = component.long_name;
            }
            if (component.types.includes("postal_code")) {
                data.components.postcode = component.long_name;
            }
        }

        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
