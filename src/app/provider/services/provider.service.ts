import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const providers = [
  {
    id: 1,
    name: 'John Antwan',
    createdAt: new Date().toLocaleString()
  },
  {
    id: 2,
    name: 'Will Smith',
    createdAt: new Date().toLocaleString()
  },
  {
    id: 3,
    name: 'Ben Afflic',
    createdAt: new Date().toLocaleString()
  }
];
let typeformUrl = environment.typeformUrl + '&order_by[]=date_submit,asc&completed=true';
const isValidAddress = (address: string) => true;
const log = o => {
  console.log(o);
  return o;
};

const tfFields = {
  key: '',
  name: 'textfield_vTgZwE4Y3I6Y',
  telegram: 'textfield_F71roLDpOUb4',
  email: 'email_aKWCXIDFcnZR',
  mailto: 'email_aKWCXIDFcnZR',
  category: {
    contentCreator: 'list_Xt43TTUriX4l_choice_Z3VlnlERPv9T',
    graphicDesigner: 'list_Xt43TTUriX4l_choice_cyBbOu3teKSt',
    softwareDeveloper: 'list_Xt43TTUriX4l_choice_sUg8Msr1zCgQ',
    virtualAssistanct: 'list_Xt43TTUriX4l_choice_giQFciGp9pZO',
    other: 'list_Xt43TTUriX4l_choice_dprOpy5gv2nz',
  },
  other: 'textfield_Uqs4XSW4sjjd',
  portfolio: 'textfield_aXIiq2m0rYUK',
  resume: 'fileupload_vAgpmuGlZ3rE',
  crypto: 'listimage_AK1plCGY9qOb_choice',
  canya: 'listimage_SvUunmYWfeLW_choice',
  why: 'textarea_UCokvzmwA4R5',
  value: 'textarea_MAzgSOUXLTBo',
  feedback: 'listimage_KthMPDQiWsEc_choice',
  ethAddress: 'textfield_gklk3UOWQxgj',
  timestamp: 'date_submit'
};

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  providers = [];

  constructor() { }

  getProvider(key: string): Promise<any> {
    return this.providers.find(provider => provider.key === key);
  }

  getProviders(options: any = {}): Promise<any> {
    if (options.fetchFromCache && this.providers.length) {
      return Promise.resolve(this.providers);
    }

    typeformUrl += '&offset=' + options.offset || 0;
    typeformUrl += '&limit=' + (options.limit || 100);

    return fetch(typeformUrl)
      .then(resp => resp.json())
      .then(log)
      .then(json => this.formatTypeformData(json['responses']))
      .then(formattedProviders => this.providers = formattedProviders)
      .catch(err => console.log('TypeFormService Error: ', err));
  }

  formatTypeformData(responses: Array<any>): Array<any> {
    return responses.map(response => {
      const answers = response.answers;
      if (isValidAddress(answers[tfFields.ethAddress])) {
        return {
          key: response['token'],
          timestamp: new Date(response['metadata']['date_submit']).toLocaleString(),
          name: answers[tfFields.name],
          telegram: answers[tfFields.telegram],
          email: answers[tfFields.email],
          mailto: 'mailto:' + answers[tfFields.mailto] + '?Subject=CanYa%20Pioneers',
          category: {
            'Content Creator': answers[tfFields.category.contentCreator],
            'Graphics Designers': answers[tfFields.category.graphicDesigner],
            'Software Developers': answers[tfFields.category.softwareDeveloper],
            'Virtual Assistants': answers[tfFields.category.virtualAssistanct],
            'Other': answers[tfFields.category.other]
          },
          other: answers[tfFields.other],
          portfolio: answers[tfFields.portfolio],
          resume: answers[tfFields.resume],
          crypto: answers[tfFields.crypto],
          canya: answers[tfFields.canya],
          why: answers[tfFields.why],
          value: answers[tfFields.value],
          feedback: answers[tfFields.feedback],
          ethAddress: answers[tfFields.ethAddress]
        };
      }
    });
  }
}
