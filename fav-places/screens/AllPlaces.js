import { useEffect, useState } from "react"
import PlacesList from "../components/Places/PlacesList";

import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../utils/database";

function AllPlaces({ route }) {
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const isFocused = useIsFocused()

    useEffect(() => {
        async function loadPlaces() {
            const result = await fetchPlaces();
            setLoadedPlaces(result)
        }
        if (isFocused) {
            loadPlaces()
            // setLoadedPlaces(currPlaces => [...currPlaces, route.params.place])
        }
    }, [isFocused])

    return (
        <PlacesList places={loadedPlaces} />
    )
}

export default AllPlaces
