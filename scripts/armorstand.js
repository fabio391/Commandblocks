/*
const noweapon = extendContent(Weapon, "noweapon", {
});

noweapon.reload = 60;
noweapon.alternate = false;
noweapon.length = 0;
noweapon.width = 0;
noweapon.recoil = 0;
noweapon.bullet = Bullets.waterShot;
noweapon.shootSound = Sounds.empty;
noweapon.minPlayerDist = 20;
*/
const spritename="commandblocks-armorstand";
const armorstand = extendContent(UnitType, "armorstand", {
  load(){
    //this.super$load();
    this.region=Core.atlas.find(this.name);
    this.baseRegion=Core.atlas.find(this.name+"-base");
    //this.shadowRegion=Core.atlas.find(this.name+"-shadow");
    //this.topRegion=Core.atlas.find(this.name+"-top");
    this.legRegion = Core.atlas.find(this.name+"-top");
  }
});
armorstand.weapon=UnitTypes.draug.weapon;
armorstand.create(prov(() => new JavaAdapter(GroundUnit, {
  behavior(){
    //just..stands
  },
  /*
  interpolate(){
    this.interpolator.update();

    this.x = this.interpolator.pos.x;
    this.y = this.interpolator.pos.y;
  },
  */
  /*
  rotate(angle){
    this.rotation+=Number(angle);
  },
  */
  updateTargeting(){
    if(this.target!=null) this.target=null;
  },
  update(){
    //this.super$update();
    //BaseUnit
    if(this.isDead()){
    //dead enemies should get immediately removed
      this.remove();
      return;
    }
    this.hitTime -= Time.delta();
    if(Vars.net.client()){
      this.interpolate();
      this.status.update(this);
      return;
    }
    if(!this.isFlying() && (Vars.world.tileWorld(this.x, this.y) != null && !(Vars.world.tileWorld(this.x,this.y).block() instanceof BuildBlock) && Vars.world.tileWorld(this.x, this.y).solid())){
      this.kill();
    }
    this.avoidOthers();
    if(this.spawner != this.noSpawner && (Vars.world.tile(this.spawner) == null || !(Vars.world.tile(this.spawner).entity instanceof UnitFactoryEntity))){
      this.kill();
    }
    this.updateTargeting();
    //this.state.update(); //braindead
    this.updateVelocityStatus();
    //if(this.target != null) this.behavior();
    if(!this.isFlying()){
      this.clampPosition();
    }

    //GroundUnit
    this.stuckTime = !this.vec.set(this.x, this.y).sub(this.lastPosition()).isZero(0.0001) ? 0 : this.stuckTime + Time.delta();
    if(!this.velocity.isZero()){
      this.baseRotation = Mathf.slerpDelta(this.baseRotation, this.velocity.angle(), 0.05);
    }
    if(this.stuckTime < 1.0){
      this.walkTime += Time.delta();
    }
  },
  countsAsEnemy(){
    return false;
  },
  drawStats(){
    this.drawBackItems(this.item.amount > 0 ? 1 : 0, false);
    this.drawLight();
  },
  drawUnder(){
    //Draw.rect(getIconRegion(), x + offsetX, y + offsetY, rotation - 90);

    Draw.rect(this.type.baseRegion, this.x, this.y, this.rotation - 90);
    Draw.rect(Core.atlas.find(spritename+"-shadow"), this.x, this.y-4);
  },
  draw(){
    Draw.mixcol(Color.white, this.hitTime / this.hitDuration);

    var floor = this.getFloorOn();
    if(floor.isLiquid){
      Draw.color(Color.white, floor.color, 0.5);
    }
    if(floor.isLiquid){
      Draw.color(Color.white, floor.color, this.drownTime * 0.4);
    }else{
      Draw.color(Color.white);
    }

    //Draw.rect(this.type.baseRegion, this.x, this.y, this.rotation - 90);

    Draw.rect(this.type.legRegion, this.x, this.y+2);

    Draw.mixcol();
  //  Draw.color();

  }
})));
this.global.armorstand=armorstand;