import {useEffect,useRef} from 'react';
import * as THREE from "three";
import { Canvas,useThree,} from '@react-three/fiber';
import { OrbitControls,useGLTF,useTexture,useAnimations} from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

export default function Dog() {

   gsap.registerPlugin(useGSAP())
   gsap.registerPlugin(ScrollTrigger)

   const model = useGLTF("/models/dog.drc.glb");

   useThree(({ camera, scene, gl }) => {
      camera.position.z = 2.5,
      gl.toneMapping = THREE.ReinhardToneMapping
      gl.outputColorSpace = THREE.SRGBColorSpace                             
   })

   const {actions} = useAnimations(model.animations,model.scene)
     useEffect(()=>{
      actions["Take 001"].play()
     },[actions])

   const[ normalMap, branchMap, branchNormalMap ] = (useTexture(["/dog_normals.jpg","/branches_diffuse.jpg","branches_normals.jpg"])).map(texture =>
      {
       texture.flipY = false
       texture.colorSpace = THREE.SRGBColorSpace
       return texture
        }
    )
   // textures.normalMap.flipY = false

     const [
      mat1,
      mat2,
      mat3,
      mat4,
      mat5,
      mat6,
      mat7,
      mat8,
      mat9,
      mat10,
      mat11,
      mat12,
      mat13,
      mat14,
      mat15,
      mat16,
      mat17,
      mat18,
      mat19,
      mat20 
     ] = (useTexture([
     
      "/matcap/mat-1.png",
      "/matcap/mat-2.png",
      "/matcap/mat-3.png",
      "/matcap/mat-4.png",
      "/matcap/mat-5.png",
      "/matcap/mat-6.png",
      "/matcap/mat-7.png",
      "/matcap/mat-8.png",
      "/matcap/mat-9.png",
      "/matcap/mat-10.png",
      "/matcap/mat-11.png",
      "/matcap/mat-12.png",
      "/matcap/mat-13.png",
      "/matcap/mat-14.png",
      "/matcap/mat-15.png",
      "/matcap/mat-16.png",
      "/matcap/mat-17.png",
      "/matcap/mat-18.png",
      "/matcap/mat-19.png",
      "/matcap/mat-20.png",

     ])).map(texture =>        
      {
       texture.flipY = false
       texture.colorSpace = THREE.SRGBColorSpace
       return texture
        }
    )

     const material = useRef({
      uMatcap1:{value:mat2},
      uMatcap2: {value:mat2},
      uProgress:{value:1.0}
    })

   const dogMaterial = new THREE.MeshMatcapMaterial({
            normalMap:normalMap,
            matcap:mat2,
            // color:"red "
         })

    const branchMaterial = new THREE.MeshMatcapMaterial ({
          normalMap:branchNormalMap,
          map:branchMap,
    })  

   function onBeforeCompile(shader){ 
      
        shader.uniforms.uMatcapTexture1 = material.current.uMatcap1
        shader.uniforms.uMatcapTexture2 = material.current.uMatcap2
        shader.uniforms.uProgress = material.current.uProgress

        // Store reference to shader uniforms for GSAP animation

        shader.fragmentShader = shader.fragmentShader.replace(
            "void main() {",
            `
        uniform sampler2D uMatcapTexture1;
        uniform sampler2D uMatcapTexture2;
        uniform float uProgress;

        void main() {
        `
        )

      shader.fragmentShader = shader.fragmentShader.replace(
  "vec4 matcapColor = texture2D( matcap, uv );",
  `
  vec4 matcapColor1 = texture2D(uMatcapTexture1, uv);
  vec4 matcapColor2 = texture2D(uMatcapTexture2, uv);

  float progress = uProgress;

  vec4 matcapColor = mix(matcapColor1, matcapColor2, progress);
  `
);
      }

   dogMaterial.onBeforeCompile = onBeforeCompile

   // model.scene.traverse((child) => {
   //    if(child.name.includes("DOG")){
   //       child.material = dogMaterial
   //    }else{
   //       child.material = branchMaterial                                                                                                                                                               
   //    }
   // })
   
   model.scene.traverse((child) => {
  if (child.isMesh) {
    if (child.name.toLowerCase().includes("branch")) {
      child.material = branchMaterial
    } else {
      child.material = dogMaterial
    }
  }
})

   const dogModel = useRef(model)

   useGSAP(()=> {
      const tl = gsap.timeline({
         scrollTrigger:{
            trigger:"#section-1",
            endTrigger:"#section-3",
            start:"top top",
            end:"bottom bottom",
            markers:true,
            scrub:true
         }
      });

      tl
      .to(dogModel.current.scene.position,{
         z:"-=1.5",
         y:"+=0.002"
      })
      .to(dogModel.current.scene.rotation,{
         x:`+=${Math.PI / 15 }`
      })
      .to(dogModel.current.scene.rotation,{
         y:`-=${Math.PI}`
      },"third")
      .to(dogModel.current.scene.position,{
         x: "-=0.4",
         z:"+=0.5",
         y:"-=0.1"
      },"third")

   })

  useEffect(() => {
      document.querySelector(`.title[img-title="tommorowland"]`).addEventListener("mouseenter", () => 
         material.current.uMatcap1.value = mat19,
         gsap.to(material.current.uProgress,{
            value:0.0,
            duration:4,
            onComplete:() => {
               // material.current.uMatcap2.value = material.current.uMatcap1.value
               material.current.uProgress.value = 1.0
          }
   })
 )

      document.querySelector(`.title[img-title="navy-pier"]`).addEventListener("mouseenter", () => 
        
         material.current.uMatcap1.value = mat8,
         gsap.to(material.current.uProgress,{
            value:0.0,
            duration:4,
            onComplete:() => {
               // material.current.uMatcap2.value = material.current.uMatcap1.value
               material.current.uProgress.value = 1.0
            }
         })
      )

   // Third one msi-chicago:-

       document.querySelector(`.title[img-title="msi-chicago"]`).addEventListener("mouseenter", () => 
        
         material.current.uMatcap1.value = mat9,
         gsap.to(material.current.uProgress,{
            value:0.0,
            duration:4,
            onComplete:() => {
               // material.current.uMatcap2.value = material.current.uMatcap1.value
               material.current.uProgress.value = 1.0
            }
         })
      )
   
   // Four Phone:-

    document.querySelector(`.title[img-title="phone"]`).addEventListener("mouseenter", () => 
        
         material.current.uMatcap1.value = mat12,
         gsap.to(material.current.uProgress,{
            value:0.0,
            duration:4,
            onComplete:() => {
               // material.current.uMatcap2.value = material.current.uMatcap1.value
               material.current.uProgress.value = 1.0
            }
         })
      )

   // Five Kikk:-

    document.querySelector(`.title[img-title="kikk"]`).addEventListener("mouseenter", () => 
        
         material.current.uMatcap1.value = mat10,
         gsap.to(material.current.uProgress,{
            value:0.0,
            duration:4,
            onComplete:() => {
               // material.current.uMatcap2.value = material.current.uMatcap1.value
               material.current.uProgress.value = 1.0
            }
         })
      )

   // Six kennedy:- 

       document.querySelector(`.title[img-title="kennedy"]`).addEventListener("mouseenter", () => 
        
         material.current.uMatcap1.value = mat8,
         gsap.to(material.current.uProgress,{
            value:0.0,
            duration:4,
            onComplete:() => {
               // material.current.uMatcap2.value = material.current.uMatcap1.value
               material.current.uProgress.value = 1.0
            }
         })
      )
   
   // Seven Opera:-
     
        document.querySelector(`.title[img-title="opera"]`).addEventListener("mouseenter", () => 
        
         material.current.uMatcap1.value = mat13,
         gsap.to(material.current.uProgress,{
            value:0.0,
            duration:4,
            onComplete:() => {
               // material.current.uMatcap2.value = material.current.uMatcap1.value
               material.current.uProgress.value = 1.0
            }
         })
      )

   // mouseleave:-
          document.querySelector(`.titles`).addEventListener("mouseleave", () => 
        
         material.current.uMatcap1.value = mat2,
         gsap.to(material.current.uProgress,{
            value:0.0,
            duration:4,
            onComplete:() => {
               // material.current.uMatcap2.value = material.current.uMatcap1.value
               material.current.uProgress.value = 1.0
            }
         })
      )
  })

   return(
    <>

    <primitive object={model.scene} position={[0.6,-2.9,0]} scale={[4.5,4.5,4.5]} rotation={[0,Math.PI / 4.2, 0]} />
    <directionalLight position={[0,5,5]} color="white" intensity={50} />
   
    <OrbitControls/>

    </>
   )

}