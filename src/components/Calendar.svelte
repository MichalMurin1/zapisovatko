<script lang="ts">

    /**
     * Return list of days
     * 🌍 localeName : name of local, f.e. en-GB, default es-MX
     *  ✅ weekday   : formart of weekday short/long (Default)
     */
    function daysForLocale(localeName = "es-MX", weekday = "long") {
        const format = new Intl.DateTimeFormat(localeName, { weekday }).format;
        return [...Array(7).keys()].map((day) =>
            format(new Date(Date.UTC(2021, 5, day)))
        );
    }
    const daysOfWeek = daysForLocale("cs-CZ", "short");

    const setToMonday = (date) => {
        // Get the day of the week for the given date (0 = Sunday, 1 = Monday, ... 6 = Saturday)
        var day = date.getDay() || 7; // Get current day number, converting Sun. to 7
        var workDate = new Date(date); // Copy date so don't modify original
        // If the day is already Monday, return the date as is
        if (day === 1) {
            return date;
        }
        // shift date to Monday
        workDate.setDate(workDate.getDate() - day + 1);
        return workDate;
    };

    /*const setToFriday = (date) => {
        var day = date.getDay() || 7;
        if (day !== 0) date.setHours(24 * (7 - day));
        return date;
    };*/

    const formatter = new Intl.DateTimeFormat("en", {
        month: "long",
        year: "numeric",
    });
    const dayFormatter = new Intl.DateTimeFormat("en", {
        day: "numeric",
    });

    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let firstDayCalendar =  new Date(setToMonday(firstDay));

</script>

<div class="col-span-7 text-center mb-8 text-xl font-bold">
    {formatter.format(firstDay)}
</div>
<table class="border-collapse border border-zinc-800 text-sm text-center">
    <tr class="">
    {#each daysOfWeek as day}
        <th class="px-6 py-4 border border-zinc-800">{day}</th>
    {/each}
    </tr>
    <!-- make calendar, loop over 41 day and iterate up firstDayCalendar -->
    {#each { length: 6} as num, i}
    <tr>
        {#each { length: 7 } as num2, j}
            {#if i == 0 && j == 0} 
                <td>{dayFormatter.format(firstDayCalendar)}</td>
            {:else}
            <td
                class="px-6 py-4 border border-zinc-800"
            >
                {dayFormatter.format(
                    firstDayCalendar.setDate(
                        firstDayCalendar.getDate() + 1
                    )
                )}
            </td>
            {/if}
        {/each}
    </tr>
    {/each}
</table>
