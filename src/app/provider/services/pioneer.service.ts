import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class PioneerService {
  pioneers = [];
  pioneersCollection: any;

  constructor(private db: AngularFirestore) {
    this.pioneersCollection = db.collection('pioneers');
  }

  getPioneer(key: string): AngularFirestoreCollection {
    return this.getPioneers({ key });
  }

  getPioneers(options: any = {}): AngularFirestoreCollection {
    const defaultOptions = Object.assign({ includeCompletedRecords: false }, options);

    let query;
    return this.db.collection('pioneers', ref => {
      // by default don't include completed records unless specified
      if (!defaultOptions.includeCompletedRecords) {
        query = ref.where('status', '>', 'completed');
      }

      // filter by key
      if (defaultOptions.key) {
        query = query || ref;
        query = query.where('key', '==', defaultOptions.key);
      }

      return query;
    });
  }

  /**
   * Every pioneer has a rating property; ex: { rating: {rank: 0, reviews:[] }}
   * rating.reviews is an array of all reviews done to the same pioneer application
   * rating.rank is the average rank of total reviews
   * a review contains rating for the questionaire where each question has a rank from 1 - 5
   * rating.task is the piece of information that's required to integrate with the CANDAO
   * task contains status (whether task is completed according to DAO standards or not), completionPoints (completion progress)
   *
   */
  updateRating({ pioneer, review, task }) {
    const rating = Object.assign({}, pioneer.rating);
    const reviews = rating.reviews || [];
    const rankedQuestions = Object.values(review.rating);

    // add the new review to the reviews list of the same application
    rating.reviews = reviews.concat(review);

    // calc rank of all review questions
    const reviewRank = rankedQuestions.reduce((sum: number, qRank) => sum += Number(qRank), 0);

    // calc average rank of all reviews
    const averageRank = (rating.rank + reviewRank) / rating.reviews.length;
    rating.rank = averageRank;

    // add CANDAO task details, returned as a result of execTask method
    rating.task = task;

    // if the task is marked as completed by the CANDAO, set the pionner application status to completed as well
    status = task.status === 'completed' ? 'completed' : pioneer.status;

    console.log('rating: ', rating);

    return this.pioneersCollection.doc(pioneer.key).update({ rating, status });
  }
}
