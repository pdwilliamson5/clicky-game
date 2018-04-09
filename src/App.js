import React, { Component } from 'react';
import './App.css';
import cats from './cats.json'
import Wrapper from './components/Wrapper'
import Navpills from './components/Navpills'
import Title from './components/Title'
import CatCard from './components/CatCard'

class App extends Component {
    state = {
        message: "Click a kitty to beginny!",
        topScore: 0,
        curScore: 0,
        cats: cats,
        unselectedCats: cats
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectCat = breed => {
        const findCat = this.state.unselectedCats.find(item => item.breed === breed);

        if(findCat === undefined) {
            // failure to select a new cat
            this.setState({ 
                message: "Come on Meow!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                
                curScore: 0,
               cats: cats,
                unselectedCats: cats
            });
        }
        else {
            // success to select a new cat
            const newCats = this.state.unselectedCats.filter(item => item.breed !== breed);
            
            this.setState({ 
                message: "Meow you got it!",
                curScore: this.state.curScore + 1,
                cats: cats,
                unselectedCats: newCats
            });
        }

        this.shuffleArray(cats);
    };

    render() {
        return (
            <Wrapper>
                <Navpills
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.cats.map(cat => (
                        <CatCards
                            breed={cat.breed}
                            image={cat.image}
                            selectCat={this.selectCat} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;

