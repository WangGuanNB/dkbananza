document.addEventListener('DOMContentLoaded', function() {
    // Skill Calculator Variables
    const totalPoints = 40;
    const skillCategories = ['power', 'speed', 'destruction', 'transformation'];
    let usedPoints = 0;
    let skillPoints = {
        power: 0,
        speed: 0,
        destruction: 0,
        transformation: 0
    };

    // DOM Elements
    const usedPointsElem = document.getElementById('used-points');
    const totalPointsElem = document.getElementById('total-points');
    const xpCostElem = document.getElementById('xp-cost');
    const summaryPointsElem = document.getElementById('summary-points');
    
    // Set initial values
    totalPointsElem.textContent = totalPoints;
    
    // Setup skill sliders
    skillCategories.forEach(category => {
        const skillCard = document.querySelector(`.skill-card.${category}`);
        if (!skillCard) return;
        
        const sliderContainer = skillCard.querySelector('.slider-container');
        const sliderTrack = skillCard.querySelector('.slider-track');
        const sliderDot = skillCard.querySelector('.slider-dot');
        
        if (!sliderContainer || !sliderTrack || !sliderDot) return;
        
        // Make slider interactive
        sliderContainer.addEventListener('click', function(e) {
            const rect = sliderContainer.getBoundingClientRect();
            const position = (e.clientX - rect.left) / rect.width;
            const newValue = Math.round(position * 10); // Max 10 points per skill
            
            if (newValue <= 10 && (usedPoints - skillPoints[category] + newValue) <= totalPoints) {
                // Update skill points
                usedPoints = usedPoints - skillPoints[category] + newValue;
                skillPoints[category] = newValue;
                
                // Update UI
                updateSlider(sliderTrack, sliderDot, newValue / 10);
                updateCounters();
                updateUnlocks(category, newValue);
            }
        });
    });
    
    // Language selector
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            // This would normally change the language, but for now we'll just alert
            alert(`Language would change to ${this.value}`);
        });
    }
    
    // Helper Functions
    function updateSlider(track, dot, value) {
        const percent = value * 100;
        track.style.width = `${percent}%`;
        dot.style.left = `${percent}%`;
    }
    
    function updateCounters() {
        usedPointsElem.textContent = usedPoints;
        summaryPointsElem.textContent = usedPoints;
        
        // Calculate XP cost (just a simple formula for demonstration)
        const xpCost = usedPoints * 5;
        xpCostElem.textContent = xpCost;
    }
    
    function updateUnlocks(category, points) {
        const unlockText = document.querySelector(`.skill-card.${category} .skill-details li:last-child`);
        if (!unlockText) return;
        
        // Update unlock information based on points
        // This is just placeholder logic - real game would have specific unlocks
        if (category === 'power' && points >= 5) {
            unlockText.textContent = 'Unlocks: Banana Slam';
        } else if (category === 'speed' && points >= 5) {
            unlockText.textContent = 'Unlocks: Double Dash';
        } else if (category === 'destruction' && points >= 5) {
            unlockText.textContent = 'Unlocks: Earth Quake';
        } else if (category === 'transformation' && points >= 5) {
            unlockText.textContent = 'Unlocks: Ostrich Form';
        } else if (category === 'transformation' && points >= 10) {
            unlockText.textContent = 'Unlocks: Gorilla King Form';
        } else {
            unlockText.textContent = 'Unlocks: None';
        }
        
        // Update build type description
        updateBuildType();
    }
    
    function updateBuildType() {
        // Determine build type based on point distribution
        let buildType = 'Balanced';
        
        // Find the skill with most points
        const maxSkill = Object.entries(skillPoints).reduce((max, [skill, points]) => {
            return points > max.points ? {skill, points} : max;
        }, {skill: null, points: -1});
        
        // If one skill has significantly more points than others
        if (maxSkill.points >= 7) {
            switch (maxSkill.skill) {
                case 'power':
                    buildType = 'Power Focused';
                    break;
                case 'speed':
                    buildType = 'Speed Runner';
                    break;
                case 'destruction':
                    buildType = 'Destruction Master';
                    break;
                case 'transformation':
                    buildType = 'Transformation Expert';
                    break;
            }
        }
        
        // Update build summary text
        const buildSummary = document.querySelector('.build-summary p');
        if (buildSummary) {
            buildSummary.textContent = `Your ${buildType} build uses ${usedPoints} skill points (${usedPoints * 5} XP).`;
        }
    }
}); 