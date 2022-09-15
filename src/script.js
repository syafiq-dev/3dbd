import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as dat from 'lil-gui'
import { MathUtils } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Colors
const pinkColor = new THREE.Color( 'pink' );

// Scene
const scene = new THREE.Scene()
scene.background = pinkColor

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const pink1 = textureLoader.load('textures/matcaps/pink1.png')
const pink2 = textureLoader.load('textures/matcaps/pink2.png')
const purple1 = textureLoader.load('textures/matcaps/purple1.png')
const cyan1 = textureLoader.load('textures/matcaps/cyan1.png')
// const matcap1 = textureLoader.load('textures/matcaps/1.png')
// const matcap2 = textureLoader.load('textures/matcaps/2.png')
// const matcap3 = textureLoader.load('textures/matcaps/3.png')
// const matcap4 = textureLoader.load('textures/matcaps/4.png')
// const matcap5 = textureLoader.load('textures/matcaps/5.png')
// const matcap6 = textureLoader.load('textures/matcaps/6.png')
// const matcap7 = textureLoader.load('textures/matcaps/7.png')
// const matcap8 = textureLoader.load('textures/matcaps/8.png')

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        // Material
        const purpleMat = new THREE.MeshMatcapMaterial({ matcap: purple1 })
        const pinkMat1 = new THREE.MeshMatcapMaterial({ matcap: pink1 })
        const pinkMat2 = new THREE.MeshMatcapMaterial({ matcap: pink2 })
        const cyanMat = new THREE.MeshMatcapMaterial({ matcap: cyan1 })

        // Text
        const textGeometry = new TextGeometry(
            't e x t',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.center()

        const text = new THREE.Mesh(textGeometry, purpleMat)
        scene.add(text)

        // Donuts
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64)
        // Ruby
        const rubyGeometry = new THREE.IcosahedronGeometry(1,0)
        /*
            Heart
        */
            const x = 0, y = 0;

            const heartShape = new THREE.Shape();
            
            heartShape.moveTo( x + 5, y + 5 );
            heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
            heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
            heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
            heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
            heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
            heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
        const extrudeSettings = {
            steps: 1,
            depth: 2,
            bevelEnabled: true,
            bevelThickness: 2,
            bevelSize: 4,
            bevelOffset: -4,
            bevelSegments: 4
        };
        const heartGeometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

        const minS = .01, maxS = .02

        for(let i = 0; i < 50; i++)
        {
            const donut = new THREE.Mesh(heartGeometry, pinkMat1)
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10
            // donut.rotation.x = Math.random() * Math.PI
            // donut.rotation.y = Math.random() * Math.PI
            const scale = Math.random() / -30

            donut.scale.set(scale, scale, scale)

            scene.add(donut)
        }
        for(let i = 0; i < 150; i++)
        {
            const donut = new THREE.Mesh(heartGeometry, pinkMat2)
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            const scale = -MathUtils.randFloat(minS,maxS)
            donut.scale.set(scale, scale, scale)

            scene.add(donut)
        }
        for(let i = 0; i < 150; i++)
        {
            const donut = new THREE.Mesh(heartGeometry, cyanMat)
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            const scale = -MathUtils.randFloat(minS,maxS)
            donut.scale.set(scale, scale, scale)

            scene.add(donut)
        }
    }
)

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

