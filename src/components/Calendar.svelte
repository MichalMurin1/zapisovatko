<script lang="ts">

/**
 * Return list of days
 * 🌍 localeName : name of local, f.e. en-GB, default es-MX
 *  ✅ weekday   : formart of weekday short/long (Default)
 */
function daysForLocale(localeName = 'es-MX', weekday = 'long') {
  const format = new Intl.DateTimeFormat(localeName, { weekday }).format;
  return [...Array(7).keys()]
    .map((day) => format(new Date(Date.UTC(2021, 5, day))));
}
const daysOfWeek = daysForLocale('cs-CZ', 'short');
const date = new Date();
const month = date.getMonth();
let firstDay = new Date(month+'-1-'+date.getFullYear());
console.log(firstDay);

</script>
<table class="text-zinc-300">
    <thead>
        <tr>
            <td colspan="7" class="text-center">
                <p class="text-xl">Mesaac</p>
            </td>
        </tr>
        <tr>
            {#each daysOfWeek as day}
                <td class="py-2 font-bold px-4 uppercase border border-zinc-500">{day}</td>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each {length: 56} as day, i}
        <tr>
            {#each {length: 7} as daysOfWeek, j}
            <td>{j}</td>
            {/each}
        </tr>
        {/each}
    </tbody>
</table>