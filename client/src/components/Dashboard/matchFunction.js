
const sortByMatchScore = function (user, potentials){
        const prefs = user.roomiePref

        const matchSortedByScore = potentials.map((potential)=>{
            const quals = potential.userQuals; 
            let score = 0;   
            quals.forEach((a,i)=>{
                if(prefs[i] === "0"|| prefs[i] === a){
                    score++
                }
            })
            potential["matchScore"] = score;
            return potential
        })
    return matchSortedByScore.sort((a,b)=>b.matchScore-a.matchScore)
}

export default sortByMatchScore;