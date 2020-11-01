import React from "react";
import VizualizerController from "../../components/vizualizer_controller";

const Field = () => <VizualizerController
    title="Field Music Vizualizer"
    name="field"
    example={{
        artist: "HWLS",
        artist_url: "https://open.spotify.com/artist/4ODo634wVqDxqgVSlXE2LO",
        song: "Met-U",
        video_url: "/metu_viz.mp4"
    }}
/>
export default Field