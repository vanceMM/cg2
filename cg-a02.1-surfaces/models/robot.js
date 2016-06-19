/**
 * Created by User on 14.06.2016.
 */

/* requireJS module definition */
define(["three"],
    function (THREE) {

        "use strict";

        var Robot = function () {


            // SIZES

            var palmSize = [100, 75, 195]; //palm
            var skullSize = [50, 35, 80];

            //finger parts
            var fingerJointSize = [30, 15, 15];
            var fingerSize = [15, 15, 140, 20];
            var fingerJointMid = [20, 15, 15];
            var fingerTipSize = [10, 1, 100, 20];
            
            //foot parts
            var footJointSize = [15, 15, 160, 20];
            var footTipSize = [20, 5, 350, 50];
            
            var toothSize = [20, 40, 160];

            // OBJECTS, name, translate, scale
            this.root = new THREE.Object3D(); // root
            // palm
            this.palm = new THREE.Object3D();
            this.palm.name = "palm";


            // this.palmJointRight = new THREE.Object3D();
            // this.palmJointRight.translateZ(palmSize[1] / 1);
            // this.palmJointRight.translateX(palmSize[1] / 1);
            // this.palmJointRight.name = "palmJointRight";

            //teeth

            this.tooth1 = new THREE.Object3D();
            this.tooth1.translateZ(toothSize[2] / 3);
            this.tooth1.translateX(toothSize[2] / 0);
            this.tooth1.translateY(toothSize[1] / 1);
            this.tooth1.name = "tooth1";

            this.skull = new THREE.Object3D();
            this.skull.translateZ(skullSize[2] / 3);
            this.skull.translateX(skullSize[2] / 0);
            this.skull.translateY(skullSize[1] / 1);
            this.skull.name = "skull";
            


            // finger right

            // finger right front
            this.fingerJointRight = new THREE.Object3D();
            this.fingerJointRight.translateZ(palmSize[0] / 2);
            this.fingerJointRight.translateX(palmSize[2] / -2);
            this.fingerJointRight.name = "fingerJointRight";

            this.fingerRightFront = new THREE.Object3D();
            this.fingerRightFront.translateZ(fingerSize[2] / 2);
            this.fingerRightFront.translateY(+fingerJointSize[0] / 3);
            this.fingerRightFront.name = "fingerRightFront";

            this.jointMidRightFront = new THREE.Object3D();
            this.jointMidRightFront.translateZ(fingerSize[2] / 2);
            this.jointMidRightFront.translateY(+fingerJointSize[3] / 2);
            this.jointMidRightFront.name = "jointMidRightFront";

            this.fingerTipRightFront = new THREE.Object3D();
            this.fingerTipRightFront.translateY(-fingerTipSize[2] / 3);
            this.fingerTipRightFront.translateZ(+fingerSize[2] / 3);
            this.fingerTipRightFront.name = "fingerTipRightFront";



            // finger left side
            this.fingerJointLeft = new THREE.Object3D();
            this.fingerJointLeft.translateZ(palmSize[0] / 2);
            this.fingerJointLeft.translateX(palmSize[2] / 2);
            this.fingerJointLeft.name = "fingerJointLeft";

            this.fingerLeftFront = new THREE.Object3D();
            this.fingerLeftFront.translateZ(fingerSize[2] / 2);
            this.fingerLeftFront.translateY(+fingerJointSize[0] / 3);
            this.fingerLeftFront.name = "fingerLeftFront";

            this.jointMidLeftSide = new THREE.Object3D();
            this.jointMidLeftSide.translateZ(fingerSize[2] / 2);
            this.jointMidLeftSide.translateY(+fingerJointSize[3] / 2);
            this.jointMidLeftSide.name = "jointMidLeftSide";

            this.fingerTipLeftSide = new THREE.Object3D();
            this.fingerTipLeftSide.translateY(-fingerTipSize[2] / 3);
            this.fingerTipLeftSide.translateZ(+fingerSize[2] / 3);
            this.fingerTipLeftSide.name = "fingerTipLeftSide";


            // foot right
            this.jointRight = new THREE.Object3D();
            this.jointRight.translateZ(palmSize[0] / 2);
            this.jointRight.translateX(palmSize[2] / -2);
            this.jointRight.name = "jointRight";

            this.footTipRight = new THREE.Object3D();
            this.footTipRight.translateY(-footTipSize[2] / 3);
            this.footTipRight.translateZ(+footJointSize[3] /- 3);
            this.footTipRight.name = "footTipRight";

            // foot left
            this.jointLeft = new THREE.Object3D();
            this.jointLeft.translateZ(palmSize[0] / 2);
            this.jointLeft.translateX(palmSize[2] / 2);
            this.jointLeft.name = "jointLeft";

            this.footTipLeft = new THREE.Object3D();
            this.footTipLeft.translateY(-footTipSize[2] / 3);
            this.footTipLeft.translateZ(+footJointSize[3] / 3);
            this.footTipLeft.name = "footTipLeft";
            
            
            
            // built up skeleton
            // finger right front

            // this.palm.add(this.palmJointRight);

            this.palm.add(this.tooth1);
            this.tooth1.add(this.skull);

            this.palm.add(this.fingerJointRight);
            this.fingerJointRight.add(this.fingerRightFront);
            this.fingerRightFront.add(this.jointMidRightFront);
            this.jointMidRightFront.add(this.fingerTipRightFront);


            // finger right side
            this.palm.add(this.fingerJointLeft);
            this.fingerJointLeft.add(this.fingerLeftFront);
            this.fingerLeftFront.add(this.jointMidLeftSide);
            this.jointMidLeftSide.add(this.fingerTipLeftSide);

            // foot right
            this.palm.add(this.jointRight);
            this.jointRight.add(this.footTipRight);
            // foot left
            this.palm.add(this.jointLeft);
            this.jointLeft.add(this.footTipLeft);

            
            
            // palm
            this.palmSkin = new THREE.Mesh(new THREE.SphereGeometry(palmSize[0], palmSize[1], palmSize[2]),
                new THREE.MeshBasicMaterial({color: 0x000000}));

            this.skullSkin = new THREE.Mesh(new THREE.SphereGeometry(skullSize[0], skullSize[1], skullSize[2]),
                new THREE.MeshBasicMaterial({color: 0x000000}));

            //tooth
            this.tooth1Skin = new THREE.Mesh(new THREE.BoxGeometry(toothSize[0], toothSize[1], toothSize[2]), new THREE.MeshBasicMaterial({color: 0xFFFFFF}));
            this.tooth1Skin.rotateX(-Math.PI * 1 / 8);
   
            // right finger skin
            this.fingerJointRightSkin = new THREE.Mesh(new THREE.SphereGeometry(fingerJointSize[0], fingerJointSize[1], fingerJointSize[2]),
                new THREE.MeshBasicMaterial({color: 0xFFFFFF}));
            this.fingerRightFrontSkin = new THREE.Mesh(new THREE.CylinderGeometry(fingerSize[0], fingerSize[1], fingerSize[2], fingerSize[3]), new THREE.MeshBasicMaterial({color: 0x000000}));
            this.fingerRightFrontSkin.rotateX(-Math.PI * 1 / 2);
            this.jointMidRightFrontSkin = new THREE.Mesh(new THREE.SphereGeometry(fingerJointMid[0], fingerJointMid[1], fingerJointMid[2]),
                new THREE.MeshBasicMaterial({color: 0xFFFFFF}));
            this.fingerTipRightFrontSkin = new THREE.Mesh(new THREE.CylinderGeometry(fingerTipSize[0], fingerTipSize[1], fingerTipSize[2], fingerTipSize[3]), new THREE.MeshBasicMaterial({color: 0x000000}));
            this.fingerTipRightFrontSkin.rotateX(-Math.PI * 1 / 3);


            // left finger skin
            this.fingerJointRightSkin4 = new THREE.Mesh(new THREE.SphereGeometry(fingerJointSize[0], fingerJointSize[1], fingerJointSize[2]),
                new THREE.MeshBasicMaterial({color: 0xFFFFFF}));
            this.fingerRightSideSkin = new THREE.Mesh(new THREE.CylinderGeometry(fingerSize[0], fingerSize[1], fingerSize[2], fingerSize[3]), new THREE.MeshBasicMaterial({color: 0x000000}));
            this.fingerRightSideSkin.rotateX(-Math.PI * 1 / 2);
            this.jointMidRightSideSkin = new THREE.Mesh(new THREE.SphereGeometry(fingerJointMid[0], fingerJointMid[1], fingerJointMid[2]),
                new THREE.MeshBasicMaterial({color: 0xFFFFFF}));
            this.fingerTipRightSideSkin = new THREE.Mesh(new THREE.CylinderGeometry(fingerTipSize[0], fingerTipSize[1], fingerTipSize[2], fingerTipSize[3]), new THREE.MeshBasicMaterial({color: 0x000000}));
            this.fingerTipRightSideSkin.rotateX(-Math.PI * 1 / 3);

            // right foot
            this.RightFootJointSkin = new THREE.Mesh(new THREE.SphereGeometry(footJointSize[0], footJointSize[1], footJointSize[2]),
                new THREE.MeshBasicMaterial({color: 0x000000}));
            this.footTipSkinL = new THREE.Mesh(new THREE.CylinderGeometry(footTipSize[0], footTipSize[1], footTipSize[2], footTipSize[3]), new THREE.MeshBasicMaterial({color: 0x000000}));
            this.footTipSkinL.rotateY(-Math.PI * -(1 / 3));
            // left foot
            this.leftFfootJointSkin = new THREE.Mesh(new THREE.SphereGeometry(footJointSize[0], footJointSize[1], footJointSize[2]),
                new THREE.MeshBasicMaterial({color: 0x000000}));
            this.footTipSkinR = new THREE.Mesh(new THREE.CylinderGeometry(footTipSize[0], footTipSize[1], footTipSize[2], footTipSize[3]), new THREE.MeshBasicMaterial({color: 0x000000}));
            this.footTipSkinR.rotateY(-Math.PI * -(1 / 3));


            this.palm.add(this.palmSkin);

            this.skull.add(this.skullSkin);
            this.tooth1.add(this.tooth1Skin);

            // finger right
            // finger right
            this.fingerJointRight.add(this.fingerJointRightSkin);
            this.fingerRightFront.add(this.fingerRightFrontSkin);
            this.jointMidRightFront.add(this.jointMidRightFrontSkin);
            this.fingerTipRightFront.add(this.fingerTipRightFrontSkin);

            // finger right
            this.fingerJointLeft.add(this.fingerJointRightSkin4);
            this.fingerLeftFront.add(this.fingerRightSideSkin);
            this.jointMidLeftSide.add(this.jointMidRightSideSkin);
            this.fingerTipLeftSide.add(this.fingerTipRightSideSkin);

            // foot right
            this.jointRight.add(this.leftFfootJointSkin);
            this.footTipRight.add(this.footTipSkinR);

            // foot left
            this.jointLeft.add(this.RightFootJointSkin);
            this.footTipLeft.add(this.footTipSkinL);

            this.root.add(this.palm);

            this.getMesh = function () {
                return this.root;
            };

        };

        return Robot;

    });