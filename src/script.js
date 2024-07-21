document.addEventListener('DOMContentLoaded', () => {
    const days = document.querySelectorAll('.day.current');
    let startDate = null;
    let endDate = null;

    days.forEach(day => {
        day.addEventListener('click', () => {
            const dayText = day.textContent;
            const dayNum = parseInt(dayText.slice(0, -1), 10);

            // 清除所有日期的選擇狀態
            days.forEach(d => {
                d.classList.remove('highlighted-blue');
            });

            if (startDate === null || (startDate !== null && dayNum < startDate)) {
                // 設置新的開始日期
                startDate = dayNum;
                endDate = null;
                day.classList.add('highlighted-blue'); // 標記開始日期
            } else if (endDate === null && dayNum >= startDate) {
                // 設置結束日期並選擇範圍
                endDate = dayNum;
                days.forEach(d => {
                    const dNum = parseInt(d.textContent.slice(0, -1), 10);
                    if (dNum >= startDate && dNum <= endDate) {
                        d.classList.add('highlighted-blue');
                    }
                });
            } else {
                // 重置開始日期
                startDate = dayNum;
                endDate = null;
                day.classList.remove('highlighted-blue'); // 標記新的開始日期
            }
        });
    });

    const nonCurrentDays = document.querySelectorAll('.day.non-current');
    nonCurrentDays.forEach(day => {
        day.addEventListener('mouseenter', () => {
            day.style.cursor = 'not-allowed';
        });
        day.addEventListener('click', (event) => {
            event.preventDefault();
        });
    });
});
