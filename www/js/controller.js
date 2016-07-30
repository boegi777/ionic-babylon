angular.module('starter.controller', [])

    .controller('MainCtrl', function ($scope, $state) {
        $scope.goToSite = function (site) {
            if (!$state.is(site))
                $state.go(site);
        }
    })

    .controller('BallCtrl', function ($scope, $ionicPlatform, $document, $window, $log) {
        $ionicPlatform.ready(function () {
            $scope.canvas = angular.element(document.querySelector('#GameCanvas'))[0];

            $scope.engine = new BABYLON.Engine($scope.canvas, true);
            $scope.scene;

            $scope.createScene = function (canvas, engine) {
                scene = new BABYLON.Scene(engine);
                var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
                var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
                camera.setPosition(new BABYLON.Vector3(-15, -15, 5));
                camera.attachControl(canvas);

                /*var camera = new BABYLON.TouchCamera("TouchCamera", new BABYLON.Vector3(0, 10, -20), scene);
                camera.setTarget(BABYLON.Vector3.Zero());
                camera.attachControl(canvas, false);*/

                //Creation of spheres
                var sphere1 = BABYLON.Mesh.CreateSphere("Sphere1", 10.0, 6.0, scene);

                //Positioning the meshes
                sphere1.position.x = 0;
                sphere1.position.y = 0;
                sphere1.position.z = 0;

                var materialSphere1 = new BABYLON.StandardMaterial("texture1", scene);
                materialSphere1.alpha = 0.5;
                materialSphere1.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
                materialSphere1.ambientColor = new BABYLON.Color3(1, 0.2, 0.7);
                //materialSphere1.wireframe = true;

                sphere1.material = materialSphere1;


                return scene;
            }

            $scope.scene = $scope.createScene($scope.canvas, $scope.engine);

            $scope.engine.runRenderLoop(function () {
                $scope.scene.render();
            });

            $window.addEventListener("resize", function () {
                $scope.engine.resize();
            });
        });
    })

    .controller('LightsCtrl', function ($scope, $ionicPlatform, $document, $window, $log) {
        $ionicPlatform.ready(function () {
            $scope.canvas = angular.element(document.querySelector('#GameCanvas'))[0];
            $scope.engine = new BABYLON.Engine($scope.canvas, true);
            $scope.scene;

            $scope.createScene = function (canvas, engine) {
                scene = new BABYLON.Scene(engine);

                var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3.Zero(), scene);
                camera.setPosition(new BABYLON.Vector3(-10, 10, 0));
                camera.attachControl(canvas);

                //Creation of sphere
                var sphere = BABYLON.Mesh.CreateSphere("Sphere", 40.0, 6.0, scene);

                //Create sphere material
                var material = new BABYLON.StandardMaterial("kosh", scene);
                material.diffuseColor = new BABYLON.Color3(1, 1, 1);
                material.maxSimultaneousLights = 16;

                sphere.material = material;

                //Creating light sphere0
                var lightSphere0 = BABYLON.Mesh.CreateSphere("LightSphere0", 16, 0.5, scene);
                lightSphere0.material = new BABYLON.StandardMaterial("red", scene);
                lightSphere0.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
                lightSphere0.material.specularColor = new BABYLON.Color3(0, 0, 0);
                lightSphere0.material.emissiveColor = new BABYLON.Color3(1, 0, 0);

                //Creating light sphere1
                var lightSphere1 = BABYLON.Mesh.CreateSphere("LightSphere1", 16, 0.5, scene);
                lightSphere1.material = new BABYLON.StandardMaterial("blue", scene);
                lightSphere1.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
                lightSphere1.material.specularColor = new BABYLON.Color3(0, 0, 0);
                lightSphere1.material.emissiveColor = new BABYLON.Color3(0, 0, 1);

                //Creating light sphere2
                var lightSphere2 = BABYLON.Mesh.CreateSphere("LightSphere1", 16, 0.5, scene);
                lightSphere2.material = new BABYLON.StandardMaterial("green", scene);
                lightSphere2.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
                lightSphere2.material.specularColor = new BABYLON.Color3(0, 0, 0);
                lightSphere2.material.emissiveColor = new BABYLON.Color3(0, 1, 0);

                //Create light0
                var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(0, 10, 0), scene);
                light0.diffuse = new BABYLON.Color3(1, 0, 0);
                light0.specular = new BABYLON.Color3(1, 0, 0);

                //Create light1
                var light1 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(10, 0, 0), scene);
                light1.diffuse = new BABYLON.Color3(0, 0, 1);
                light1.specular = new BABYLON.Color3(0, 0, 1);

                //Create light2
                var light2 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(10, 0, 0), scene);
                light2.diffuse = new BABYLON.Color3(0, 1, 0);
                light2.specular = new BABYLON.Color3(0, 1, 0);

                //Animations
                var alpha = 0;
                scene.beforeRender = function () {
                    light0.position = new BABYLON.Vector3(10 * Math.sin(alpha), 0, 10 * Math.cos(alpha));
                    light1.position = new BABYLON.Vector3(10 * Math.sin(alpha), 10 * Math.cos(alpha), 0);
                    light2.position = new BABYLON.Vector3(10 * Math.cos(alpha), 10 * Math.sin(alpha), 0);

                    lightSphere0.position = light0.position;
                    lightSphere1.position = light1.position;
                    lightSphere2.position = light2.position;

                    alpha += 0.01;
                }

                return scene;
            }

            $scope.scene = $scope.createScene($scope.canvas, $scope.engine);

            $scope.engine.runRenderLoop(function () {
                $scope.scene.render();
            });

            $window.addEventListener("resize", function () {
                $scope.engine.resize();
            });
        });
    })

    .controller('AnimationCtrl', function ($scope, $ionicPlatform, $document, $window, $log) {
        $ionicPlatform.ready(function () {
            $scope.canvas = angular.element(document.querySelector('#GameCanvas'))[0];
            $scope.engine = new BABYLON.Engine($scope.canvas, true);
            $scope.scene;

            $scope.createScene = function (canvas, engine) {
                scene = new BABYLON.Scene(engine);

                var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(30, 0, 0), scene);
                camera.setPosition(new BABYLON.Vector3(-10, 0, 0));
                camera.attachControl(canvas);

                var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-10, 20, -30), scene);
                light.diffuse = new BABYLON.Color3(1, 0, 0);
                light.specular = new BABYLON.Color3(1, 0, 0);

                //Create Box
                var box = new BABYLON.Mesh.CreateBox('Box', 10.0, scene);
                box.position.x = 30;

                //Create Animation 
                var boxAnimation = new BABYLON.Animation("boxAnimation", "scaling.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

                // An array with all animation keys
                var keys = [];

                //At the animation key 0, the value of scaling is "1"
                keys.push({
                    frame: 0,
                    value: 1
                });

                //At the animation key 20, the value of scaling is "0.2"
                keys.push({
                    frame: 20,
                    value: 0.2
                });

                //At the animation key 100, the value of scaling is "1"
                keys.push({
                    frame: 100,
                    value: 1
                });

                //Create Event for KeyFrame 50
                var event = new BABYLON.AnimationEvent(50, function () {
                    $log.log('Yeah!');
                }, true);

                boxAnimation.setKeys(keys);
                boxAnimation.addEvent(event);
                box.animations.push(boxAnimation);
                scene.beginAnimation(box, 0, 100, true);

                return scene;
            }

            $scope.scene = $scope.createScene($scope.canvas, $scope.engine);

            $scope.engine.runRenderLoop(function () {
                $scope.scene.render();
            });

            $window.addEventListener("resize", function () {
                $scope.engine.resize();
            });
        });
    })

    .controller('SpriteCtrl', function ($scope, $ionicPlatform, $document, $window, $log) {
        $ionicPlatform.ready(function () {
            $scope.canvas = angular.element(document.querySelector('#GameCanvas'))[0];
            $scope.engine = new BABYLON.Engine($scope.canvas, true);
            $scope.scene;

            $scope.createScene = function (canvas, engine) {
                scene = new BABYLON.Scene(engine);

                var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(30, 0, 0), scene);
                camera.setPosition(new BABYLON.Vector3(-10, 0, 0));
                camera.attachControl(canvas);

                var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-10, 20, -30), scene);
                light.diffuse = new BABYLON.Color3(1, 0, 0);
                light.specular = new BABYLON.Color3(1, 0, 0);

                //Create tree manager
                var spriteManagerTrees = new BABYLON.SpriteManager("treesManagr", "Assets/palm-arecaceae.png", 2000, 675, scene);

                //Create trees
                for (var i = 0; i < 800; i++) {
                    var tree = new BABYLON.Sprite('tree', spriteManagerTrees);
                    tree.position.x = Math.random() * 50 - 20;
                    tree.position.z = Math.random() * 20 - 5;
                    tree.position.y = 0.3;
                    tree.size = 1;
                    tree.isPickable = true;
                }

                //Create player sprites
                var spriteManagerPlayer = new BABYLON.SpriteManager("playerManagr", "Assets/player.png", 2, 64, scene);
                //Create Instance for player
                var player = new BABYLON.Sprite("player", spriteManagerPlayer);
                player.positiony = -0.3;
                player.size = 0.5;
                //player.angle = Math.PI/4;
                player.invertU = -1;

                player.playAnimation(0, 9, true, 100);

                return scene;
            }

            $scope.scene = $scope.createScene($scope.canvas, $scope.engine);

            $scope.engine.runRenderLoop(function () {
                $scope.scene.render();
            });

            $window.addEventListener("resize", function () {
                $scope.engine.resize();
            });
        });
    });