import React from 'react';

export default class PokemonInfo extends React.Component
{
    constructor(props) {
        super(props);
        
        this.maxRaidLvl = 5;
        this.blackStarCode = 9733;
        this.whiteStarCode = 9734
    }
    
    getStars(raidLvl) {
        var number = parseInt(raidLvl);
        var stars = '';
        
        for(var i = 1; i <= this.maxRaidLvl; i++) {
            if(i < number) {
                stars = stars + String.fromCharCode(this.blackStarCode);
            } else {
                stars = stars + String.fromCharCode(this.whiteStarCode);
            }
        }
        
        return stars;
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-md-12 text-center">
                    {this.props.pokemonName}
                </div>
                <div className="col-md-12 text-center">
                    {this.getStars(this.props.raidLvl)}
                </div>
            </div>
        );
    }
}