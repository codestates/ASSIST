import { Injectable } from '@nestjs/common';
import { getManager, getRepository } from 'typeorm';
import { MakeM } from 'src/common/naver_sens/make_M_template';
import { NaverSensService } from 'src/common/naver_sens/sens.service';
import { MatchService } from 'src/match/match.service';
import { getDate } from 'src/common/getDate';
import { MatchRepository } from 'src/match/match.repository';
import { Match } from 'src/match/match.entity';
import { M009dto, M010dto } from 'src/common/naver_sens/dto/template.dto';
import { MakeU } from 'src/common/naver_sens/make_U_template';

@Injectable()
export class KakaoAlimService {
  makeM = new MakeM();
  naverSensService = new NaverSensService();
  async sendM012() {
    let nextday = getDate(1);

    const queryString = `SELECT b.name, b.phone , d.name as team, c.id,c.date,c.startTime,c.endTime, c.deadline, c.address,c.address2
     FROM user_match as a join user as b on b.id = a.userId
    join assist.match as c on c.id = matchId join team as d on d.id = teamId 
    where c.deadline = '${nextday}' and a.condition in ('미응답','미정') and c.condition = '인원 모집 중'`;

    // 메세지 보낼 대상들.
    let data: [] = await getManager().query(queryString);

    if (data.length) {
      let messages = data.map(
        ({ name, phone, team, date, startTime, endTime, deadline, address, address2, id }) => {
          return this.makeM.M012(phone, {
            matchId: id,
            name,
            team,
            date,
            startTime,
            endTime,
            deadline,
            address,
            address2,
          });
        },
      );
      this.naverSensService.sendKakaoAlarm('M012', messages);
    }
  }

  async sendM003() {
    let nextday = getDate(1);

    const queryString = `SELECT b.name, b.phone , d.name as team, c.id,c.date,c.startTime,c.endTime, c.deadline, c.address,c.address2
     FROM user_match as a join user as b on b.id = a.userId
    join assist.match as c on c.id = matchId join team as d on d.id = teamId 
    where c.deadline = '${nextday}' and a.condition in ('미응답','불참') and c.condition = '인원 모집 중'`;

    // 메세지 보낼 대상들.
    let data: [] = await getManager().query(queryString);
    console.log(data);
    if (data.length) {
      let messages = data.map(
        ({ name, phone, team, date, startTime, endTime, deadline, address, address2, id }) => {
          return this.makeM.M003(phone, {
            matchId: id,
            name,
            team,
            date,
            startTime,
            endTime,
            deadline,
            address,
            address2,
          });
        },
      );
      this.naverSensService.sendKakaoAlarm('M003', messages);
    }
  }

  async autoFixMatchSendM006(data) {
    let arr = [];
    console.log(data);

    data.forEach((item) => {
      let attend = 0;
      let absent = 0;
      let arr2 = [];
      item.user_matchs.forEach((el) => {
        const payload: any = {
          matchId: el.id,
          team: item.team.name,
          startTime: item.startTime,
          endTime: item.endTime,
          address: item.address,
          address2: item.address2,
          date: item.date,
        };

        if (el.condition === '찬성') {
          attend++;
          payload.to = el.user.phone;
          payload.name = el.user.name;
          arr2.push(payload);
        } else if (el.condition === '미응답' || el.condition === '미정') {
          absent++;
          payload.to = el.user.phone;
          payload.name = el.user.name;
          arr2.push(payload);
        } else {
          absent++;
        }
      });

      arr2.forEach((el) => {
        el.attend = attend;
        el.absent = absent;
        let form = this.makeM.M006(el.to, el);
        arr.push(form);
      });
    });

    return arr.length ? this.naverSensService.sendKakaoAlarm('M006', arr) : null;
  }

  async sendM006(data) {
    return this.autoFixMatchSendM006([data]);
  }

  async sendM007() {
    let nextday = getDate(1);

    let data: any = await getRepository(Match)
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.team', 'team')
      .leftJoinAndSelect('team.leaderId', 'leaderId')
      .leftJoinAndSelect('match.user_matchs', 'user_match')
      .leftJoinAndSelect('user_match.user', 'user')
      .where('match.date = :date', { date: nextday })
      // .andWhere('match.condition = :condition', { condition: '경기 준비 중' })
      .getMany();

    if (!data.length) {
      return { message: '내일 예정 경기가 없습니다.' };
    }

    let arr = [];
    data.forEach((item) => {
      let attend = 0;
      let absent = 0;
      let arr2 = [];
      item.user_matchs.forEach((el) => {
        const payload: any = {
          matchId: item.id,
          team: item.team.name,
          startTime: item.startTime,
          endTime: item.endTime,
          address: item.address,
          address2: item.address2,
          date: item.date,
          leader: item.team.leaderId.name,
          to: item.team.leaderId.phone,
        };
        if (el.condition === '찬성') {
          attend++;
        } else {
          absent++;
        }
        arr2.push(payload);
      });
      arr2.forEach((el) => {
        el.attend = attend;
        el.absent = absent;
        let form = this.makeM.M007(el.to, el);
        arr.push(form);
      });
    });
    return arr.length ? this.naverSensService.sendKakaoAlarm('M007', arr) : null;
  }

  async sendM008(data, beforeCondi, afterCondi) {
    let to = data.team.leaderId.phone;
    let payload = {
      matchId: data.id,
      team: data.team.name,
      startTime: data.startTime,
      endTime: data.endTime,
      address: data.address,
      address2: data.address2,
      date: data.date,
      name: data.user_matchs[0].user.name,
      leader: data.team.leaderId.name,
      before: beforeCondi,
      after: afterCondi,
    };
    let form = this.makeM.M008(to, payload);
    this.naverSensService.sendKakaoAlarm('M008', [form]);
  }
  async sendM009(data) {
    let arr = [];
    let arr2 = [];
    data.user_matchs.forEach((el) => {
      if (el.condition === '참석' || el.condition === '미정' || el.condition === '미응답') {
        const payload: M009dto = {
          matchId: data.id,
          team: data.team.name,
          startTime: data.startTime,
          endTime: data.endTime,
          address: data.address,
          address2: data.address2,
          date: data.date,
          name: el.user.name,
          reason: el.reason,
          to: el.user.phone,
        };
        arr2.push(payload);
      }
    });
    arr2.forEach((el) => {
      let form = this.makeM.M009(el.to, el);
      arr.push(form);
    });
    this.naverSensService.sendKakaoAlarm('M009', arr);
  }

  async sendU001(user) {
    let makeU = new MakeU();
    let form = makeU.U001(user.phone);
    this.naverSensService.sendKakaoAlarm('U001', [form]);
  }

  async sendM010(match, merceneryDto, user) {
    const payload: M010dto = {
      matchId: match.id,
      team: match.team.name,
      startTime: match.startTime,
      endTime: match.endTime,
      address: match.address,
      address2: match.address2,
      date: match.date,
      need: merceneryDto.needNumber,
      money: merceneryDto.money,
    };
    let form = this.makeM.M010(user.phone, payload);
    this.naverSensService.sendKakaoAlarm('M010', [form]);
  }
}
