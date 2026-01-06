<script>
    import Title from '$lib/components/title.svelte';
    import { Card, Listgroup, Avatar, Spinner, Tooltip } from 'flowbite-svelte';
    import axios from 'axios';

    import { onMount } from 'svelte';

    let stats, data;
    let loadingStats = true;
    onMount(async () => {
        const response = await axios.get('admin/stats', {
            withCredentials: true,
        });

        if (response.status === 200) {
            data = response.data.data;

            function declension(count, one, few, many) {
                if (count === 1) {
                    return one;
                } else if (count >= 2 && count <= 4) {
                    return few;
                } else {
                    return many;
                }
            }

            stats = [
                {
                    title: 'Platby',
                    description: 'Celkový počet plateb',
                    value: data.payments,
                    tooltip: `${data.total.records} ${declension(
                        data.total.records,
                        'platební záznam',
                        'platební záznamy',
                        'platebních záznamů'
                    )}`,
                },
                {
                    title: 'Platiči',
                    description: 'Celkový počet platičů',
                    value: data. payers,
                },
                {
                    title:  'Zaplaceno',
                    description: 'Celkem bylo zaplaceno',
                    value: `${new Intl.NumberFormat('cs-CZ', {
                        style: 'currency',
                        currency: 'CZK',
                        minimumFractionDigits: 0,
                    }).format(data.paid.amount)}`,
                    tooltip: `${data.paid.records} ${declension(
                        data. paid.records,
                        'platba',
                        'platby',
                        'plateb'
                    )}`,
                },
                {
                    title: 'Nezaplaceno',
                    description: 'Celkem nebylo zaplaceno',
                    value: `${new Intl.NumberFormat('cs-CZ', {
                        style: 'currency',
                        currency: 'CZK',
                        minimumFractionDigits: 0,
                    }).format(data.unpaid.amount)}`,
                    tooltip: `${data.unpaid.records} ${declension(
                        data.unpaid.records,
                        'platba',
                        'platby',
                        'plateb'
                    )}`,
                },
                {
                    title: 'Uživatelé',
                    description: 'Celkový počet uživatelů',
                    value: data. users.total,
                    tooltip: `${data.users.admins} ${declension(
                        data.users.admins,
                        'admin',
                        'admini',
                        'adminů'
                    )} a ${data.users.users} ${declension(
                        data.users.users,
                        'platič',
                        'platiči',
                        'platičů'
                    )}`,
                },
                {
                    title: 'Kredity',
                    description: 'Celkový počet kreditů',
                    value: `${new Intl.NumberFormat('cs-CZ', {
                        style: 'currency',
                        currency: 'CZK',
                        minimumFractionDigits: 0,
                    }).format(data.credits.amount.total)}`,
                    tooltip: `${data.credits.records.total} ${declension(
                        data.credits. records.total,
                        'pohyb',
                        'pohyby',
                        'pohybů'
                    )}`,
                },
            ];
    });
</script>

<Title title="Administrace" />

{#if loadingStats}
    <div class="mt-5 text-center">
        <Spinner color="yellow" />
    </div>
{:else}
    <Card padding="xl" size="md" class="m-8">
        <div class="mb-4 flex text-center">
            <h5
                class="text-xl font-bold leading-none text-gray-900 dark:text-white"
            >
                Statistiky
            </h5>
        </div>
        <Listgroup items={stats} let:item class="border-0 dark:!bg-transparent">
            <div class="flex items-center space-x-4">
                <div class="min-w-0 flex-1">
                    <p
                        class="truncate text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {item.title}
                    </p>
                    <p
                        class="truncate text-sm text-gray-500 dark:text-gray-400"
                    >
                        {item.description}
                    </p>
                </div>
                <div
                    class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                >
                    {item.value}
                </div>
                {#if item.tooltip}
                    <Tooltip>
                        {item.tooltip}
                    </Tooltip>
                {/if}
            </div>
        </Listgroup>
    </Card>
{/if}
