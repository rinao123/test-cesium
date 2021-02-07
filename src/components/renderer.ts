import * as Cesium from "cesium";
import { getStaticRes } from "../utils/commonUtil";
import "cesium/Build/Cesium/Widgets/widgets.css";

export default class Renderer {
    init = (): void => {
        Object.assign(window, { CESIUM_BASE_URL: getStaticRes("/static/cesium/") });
        Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYTIzMzUyOS1hNTFiLTQzMzQtYmUwYS02OTRlNTFhNzI0MWUiLCJpZCI6NDMyODMsImlhdCI6MTYxMjQwNDEzOX0.c_qcuv76y5cAnA9Hag2Iqpk1KbbrkwpgUUwPa6NsKqQ";
        // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
        const viewer = new Cesium.Viewer("park3d", {
            // terrainProvider: Cesium.createWorldTerrain(),
            // animation: false,
            // baseLayerPicker: false,
            // vrButton: false,
            // geocoder: false,
            // navigationHelpButton: false,
            // navigationInstructionsInitiallyVisible: false,
            // fullscreenButton: false,
            // homeButton: false,
            // infoBox: false,
            // sceneModePicker: false,
            // selectionIndicator: false,
            // timeline: false,
            // useBrowserRecommendedResolution: false
        });
        (viewer.cesiumWidget.creditContainer as HTMLDivElement).style.display = "none";
        const tileset = new Cesium.Cesium3DTileset({
            url: getStaticRes("/static/tiles/tileset.json")
        });
        //添加到球体上
        viewer.scene.primitives.add(tileset);
        //定位过去
        viewer.zoomTo(tileset);

        // 添加标签
        const helper = new Cesium.EventHelper();
        helper.add(tileset.allTilesLoaded, () => {
            tileset.root.children.forEach((tile: Cesium.Cesium3DTile, index: number) => {
                viewer.entities.add({
                    position: tile.boundingSphere.center,
                    label: {
                        text: `测试名称${index + 1}`,
                        font: '14pt Source Han Sans CN',    //字体样式
                        fillColor: Cesium.Color.BLACK,        //字体颜色
                        backgroundColor: Cesium.Color.WHITE,    //背景颜色
                        showBackground: true,                //是否显示背景颜色
                        style: Cesium.LabelStyle.FILL,        //label样式
                        outlineWidth: 2,
                        verticalOrigin: Cesium.VerticalOrigin.CENTER,//垂直位置
                        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,//水平位置
                        pixelOffset: new Cesium.Cartesian2(0, -50)            //偏移
                    }
                });
                


                viewer.entities.add({
                    name: 'Red line on terrain',
                    polyline: {
                        positions: [tileset.root.children[0].boundingSphere.center, tileset.root.children[2].boundingSphere.center],
                        width: 4,
                        material: new Cesium.PolylineGlowMaterialProperty({
                            color: Cesium.Color.AQUA.withAlpha(0.9),
                            glowPower : 0.3,
                        })
                    }
                });
            })
        });
    }
}