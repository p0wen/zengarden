describe('Meditation App', ()=>{
    describe("Streakbar Management", function() {
        beforeEach(function() {
            localStorage.clear()
        });
        it("should initialize the streak", function() {
            streakInit();
            expect(streak).toBe(0);
        });
        it("should reset Streak if dateLastDone != oneDayAgo", function(){
            dateLastDone = setTodayDate();
            oneDayAgo = setOneDayAgo();
            expect(checkStreak()).toBe(true)
        })
        it("should store global variables", function(){
            expect(countdownleft).toBe(3);
        })
    });
    describe("Format Duration", function() {
        it("format 60 seconds to 1:00", function() {
            expect(formatDuration(60)).toBe("1:00");
        });
        it("format 90 seconds to 1:30", function() {
            expect(formatDuration(90)).toBe("1:30")
        });
        it("format 0 seconds to 0:00", function() {
            expect(formatDuration(0)).toBe("0:00")
        });
        it("format 64 seconds to 1:04", function() {
            expect(formatDuration(64)).toBe("1:04")
        });
    });
});