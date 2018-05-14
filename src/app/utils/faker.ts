const futureDate = days => (new Date(Date.now() + 1000 * 60 * 60 * 24 * days).toLocaleString());
const pastDate = days => (new Date(Date.now() - 1000 * 60 * 60 * 24 * days).toLocaleString());
const rand = max => Math.floor(Math.random() * Math.floor(max));

export class Faker {
  static getTasks(appId = 1): Array<any> {
    return [
      {
        id: 1,
        title: 'Vote Providers',
        type: 'Rating',
        description: 'Up/Down vote provider profiles based on profile assessment',
        instructions: `
          <ul>
            <li>Login to canya.com</li>
            <li>Go to Dashboard > Providers</li>
            <li>Select "None-Voted" from list filter</li>
            <li>Check the provider profile</li>
            <li>From ranking section, rank the answered application answers based on the quality of the answer & attachments</li>
            <li>From DAOTasks dropdown, Select "Voting Task Completed"</li>
            <li>Save Provider Profile</li>
            <li>Continue to rest of providers as you wish</li>
          </ul>
        `,
        startDate: new Date().toLocaleString(),
        expiryDate: futureDate(7),
        runs: 500,
        completedRuns: [
          {
            userId: 22,
            prize: 1,
            completedAt: pastDate(3)
          },
          {
            userId: 67,
            prize: 1,
            completedAt: pastDate(4)
          },
          {
            userId: 33,
            prize: 2,
            completedAt: pastDate(5)
          }
        ],
        prizePerApplication: 2, // CANS
        maxPrizePerApplication: 5,
        minInactivityPeriodInHoursBeforePrizeAjdustment: 48,
        pizeAdjustmentPercentage: 25,
        appId: 1
      },
      {
        id: 2,
        type: 'Classification',
        title: 'Provider Categorisation',
        description: 'Add the provider to all possible categories matching with his profile',
        instructions: `
          <ul>
            <li>Login to canya.com</li>
            <li>Go to Dashboard > Providers</li>
            <li>Select "None-categorised" from list filter</li>
            <li>Check the provider profile</li>
            <li>Click edit > tags</li>
            <li>Assign provider to all categories suitable for his profile</li>
            <li>From DAOTasks dropdown, Select "Categorisation Task Completed"</li>
            <li>Save Provider Profile</li>
            <li>Continue to rest of providers as you wish</li>
          </ul>
        `,
        startDate: new Date().toLocaleString(),
        expiryDate: futureDate(7),
        runs: 300,
        completedRuns: [
          {
            userId: 22,
            prize: 1,
            completedAt: pastDate(3)
          },
          {
            userId: 67,
            prize: 1,
            completedAt: pastDate(4)
          },
          {
            userId: 33,
            prize: 2,
            completedAt: pastDate(5)
          }
        ],
        prizePerApplication: 1, // CANS
        maxPrizePerApplication: 3,
        minInactivityPeriodInHoursBeforePrizeAjdustment: 24,
        pizeAdjustmentPercentage: 15,
        appId: 1
      },
      ,
      {
        id: 3,
        type: 'Rating',
        title: 'Review CVs',
        description: 'Review posted CVs and rank them',
        instructions: `
          <ul>
            <li>Login to canhire.com</li>
            <li>Go to Dashboard > Posted Jobs</li>
            <li>Click a job</li>
            <li>Check one of the posted CVs</li>
            <li>Review a CV</li>
            <li>Give it a rank between 1-5 based on how it's related to the posted job</li>
            <li>Once reviewed, From DAOTasks dropdown, Select "Task Completed"</li>
            <li>Continue to rest of CVs as you wish</li>
          </ul>
        `,
        startDate: new Date().toLocaleString(),
        expiryDate: futureDate(7),
        prizePerApplication: 10, // CANS
        maxPrizePerApplication: 20,
        minInactivityPeriodInHoursBeforePrizeAjdustment: 24,
        pizeAdjustmentPercentage: 15,
        appId: 2,
        runs: 350,
        completedRuns: [
          {
            userId: 22,
            prize: 1,
            completedAt: pastDate(3)
          },
          {
            userId: 67,
            prize: 1,
            completedAt: pastDate(4)
          },
          {
            userId: 33,
            prize: 2,
            completedAt: pastDate(5)
          }
        ]
      }
    ].filter(task => task.appId === appId);
  }

  static getTask(id): any {
    const t = Faker.getTasks().find(task => task.id === id);
    t.app = Faker.getApp(Number(t.appId)) || {};
    return t;
  }

  static getPayments(userId): Array<any> {
    return Faker.getTasks().map(task => ({
      amount: rand(50),
      apps: rand(20),
      task: Object.assign({ completedAt: pastDate(rand(5)) }, task)
    }));
  }

  static getApps(): Array<any> {
    return [
      {
        id: 1,
        name: 'CanYa.com',
        description: 'CanYa market place for skills',
        ethAddress: '0x32be343b94f860124dc4fee278fdcbd38c102d88',
        remainingCredit: 5200,
        tasks: Faker.getTasks(1)
      },
      {
        id: 2,
        name: 'CANHire',
        description: 'Post a job and get prospective employees referrals',
        ethAddress: '',
        remainingCredit: 2500,
        tasks: Faker.getTasks(2)
      },
      {
        id: 3,
        name: 'CANShare',
        description: 'Share files directly, no registration is required',
        ethAddress: '0x32be343b94f860124dc4fee278fdcbd38c102d88',
        remainingCredit: 1400,
        tasks: Faker.getTasks(3)
      }
    ];
  }

  static getApp(id): any {
    return Faker.getApps().find(app => app.id === id);
  }

}
